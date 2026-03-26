import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  content: z.string().min(1, 'Content is required'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const updatePostSchema = z
  .object({
    title: z.string().min(1).max(500).optional(),
    content: z.string().min(1).optional(),
  })
  .refine((d) => d.title !== undefined || d.content !== undefined, {
    message: 'At least one of title or content must be provided',
  })

export type UpdatePostInput = z.infer<typeof updatePostSchema>

export const idParamSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid post id'),
})

export const slugParamSchema = z.object({
  slug: z.string().min(1).max(300),
})
