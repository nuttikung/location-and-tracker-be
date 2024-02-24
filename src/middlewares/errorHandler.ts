import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '@/types'

const isProduction = process.env.NODE_ENV === 'production' ?? false

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  return res.status(statusCode).json({
    message: err.message,
    // COMMENT: Don't give the stack for anonymous.
    stack: isProduction ? '🥞' : err.stack,
  })
}
