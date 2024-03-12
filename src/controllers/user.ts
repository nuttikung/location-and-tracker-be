import { User, LoginUser } from '@/types'
import { type RequestHandler, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { createDBconnection, createAccessToken } from '@/helpers'
import { MongoError } from 'mongodb'
import { config } from '@/configs'

export const login: RequestHandler<
  unknown,
  unknown,
  LoginUser,
  unknown
> = async (req, res: Response, next: NextFunction) => {
  // TODO: move to validation middleware.
  const { success } = LoginUser.safeParse(req.body)
  if (!success) {
    res.statusCode = 422
    return next(new Error('entity does not match'))
  }
  try {
    const { getConnection } = createDBconnection()
    const client = await getConnection()
    const db = client.db(config.database.name)
    const result = await db
      .collection('user')
      .findOne<User>({ username: req.body.username })
    if (!result) {
      res.statusCode = 422
      return next(new Error('user or password does not match'))
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      result.password,
    )
    if (!isPasswordMatch) {
      res.statusCode = 422
      return next(new Error('user or password does not match'))
    }
    const { username, email } = result
    const token = createAccessToken({ username, email })
    return res.status(201).json({ token })
  } catch (error) {
    return next(error)
  }
}

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
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password, salt)
    // COMMENT: DB management
    const { getConnection } = createDBconnection()
    const client = await getConnection()
    const db = client.db(config.database.name)
    const result = await db.collection('user').insertOne({
      username,
      email,
      password: hasPassword,
      createAt: new Date(),
    })
    if (result.acknowledged) {
      const token = createAccessToken({ username, email })
      return res.status(201).json({ token })
    }
    res.statusCode = 422
    throw new Error('failed to register')
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      res.statusCode = 422
      return next(new Error('user already taken'))
    }
    return next(error)
  }
}
