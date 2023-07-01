import { z } from 'zod'

export const pagedRequestSchema = z.object({
    query: z.object({
        page: z.preprocess(
            Number,
            z.number()
        ), pageSize: z.preprocess(
            Number,
            z.number()
        )
    })
});