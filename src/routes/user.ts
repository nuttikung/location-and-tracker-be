import { Router } from 'express'
import { register } from '@/controllers'

export const userRoute = Router()

userRoute.post('/register', register)
