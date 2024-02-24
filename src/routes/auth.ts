import { Router } from 'express'
import { loginController, registerController } from '@/controllers'

export const authRoute = Router()

authRoute.post('/login', loginController)
authRoute.post('/register', registerController)
