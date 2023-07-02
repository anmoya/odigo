import { z } from "zod";

export const pagedRequestSchema = z.object({
  query: z.object({
    page: z.preprocess(Number, z.number()),
    pageSize: z.preprocess(Number, z.number()),
  }),
});

export const createUserBodySchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.preprocess(Number, z.number()),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.preprocess(Number, z.number()),
  }),
  body: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.preprocess(Number, z.number()),
  }),
});
