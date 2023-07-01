import { z } from 'zod'

export const createUserBodySchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email()
    })
});