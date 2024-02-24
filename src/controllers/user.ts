import { User } from '@/types'
import { type RequestHandler, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { createDBconnection } from '@/helpers'
import { MongoError } from 'mongodb'

const database: string = process.env.DB_NAME ?? 'example'

export const register: RequestHandler<unknown, unknown, User, unknown> = async (
  req,
  res: Response<{ token: string }>,
  next: NextFunction,
) => {
  // TODO: move validate to middleware.
  const { success } = User.safeParse(req.body)
  if (!success) {
    res.statusCode = 422
    return next(new Error('entity does not match'))
  }
  try {
    const { username, password, firstName, lastName } = req.body
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password, salt)
    // COMMENT: DB management
    const { getConnection } = createDBconnection()
    const client = await getConnection()
    const db = client.db(database)
    await db.collection('user').insertOne({
      username,
      password: hasPassword,
      firstName,
      lastName,
      createAt: new Date(),
    })
    return res.status(201).json({ token: 'something...' })
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      res.statusCode = 422
      return next(new Error('user already taken'))
    }
    return next(error)
  }
}
