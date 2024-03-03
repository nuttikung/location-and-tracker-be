import { Router } from 'express'
import { login, register } from '@/controllers'

export const userRoute = Router()

userRoute.post('/login', login)
userRoute.post('/register', register)
