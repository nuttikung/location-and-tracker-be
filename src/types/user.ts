import { z } from 'zod'

export const User = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createAt: z.optional(z.date()),
  updateAt: z.optional(z.date()),
})

export type User = z.infer<typeof User>

export const LoginUser = User.pick({ username: true, password: true })

export type LoginUser = z.infer<typeof LoginUser>
