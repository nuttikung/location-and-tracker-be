import jwt from 'jsonwebtoken'
import { User } from '@/types'
import { config } from '@/configs'

export const createAccessToken = (user: Omit<User, 'password'>) => {
  const accessToken = jwt.sign(user, config.jwt.accessSecret, {
    expiresIn: '10m',
  })
  return accessToken
}
