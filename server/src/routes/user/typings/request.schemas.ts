import { z } from 'zod'

export const pagedRequestSchema = z.object({
    query: z.object({ page: z.number(), pageSize: z.number() })
});