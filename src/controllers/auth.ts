import { type loginBody } from '@/types'
import { type RequestHandler } from 'express'

export const loginController: RequestHandler<
  unknown,
  unknown,
  loginBody,
  unknown
> = (req, res) => {
  const { username, password } = req.body
  if (username === 'john' && password === '123456') {
    // make jwt token for token and refresh token
    res.json({
      token: 'this is example',
    })
  }
}
