import { z } from 'zod'

export type loginBody = {
  username: string
  password: string
}

export const registerBodySchema = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createAt: z.optional(z.date()),
})

export type registerBody = z.infer<typeof registerBodySchema>
