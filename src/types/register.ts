import { z } from 'zod'

export const NewUser = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  createAt: z.optional(z.date()),
  updateAt: z.optional(z.date()),
})

export type NewUser = z.infer<typeof NewUser>

export const SignupUser = NewUser.pick({ username: true, email:true, password: true })

export type SignupUser = z.infer<typeof SignupUser>
