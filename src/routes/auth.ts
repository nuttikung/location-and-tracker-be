import { Router } from 'express'
import { loginController } from '@/controllers'

export const authRoute = Router()

authRoute.post('/login', loginController)
