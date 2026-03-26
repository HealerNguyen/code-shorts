import type { FastifyReply, FastifyRequest } from 'fastify'
import { error, success } from '../../utils/response.js'
import {
  createPostSchema,
  idParamSchema,
  slugParamSchema,
  updatePostSchema,
} from './post.schema.js'
import * as postService from './post.service.js'

export async function list(_req: FastifyRequest, reply: FastifyReply) {
  const posts = await postService.listPosts()
  return reply.send(success(posts))
}

export async function getBySlug(
  req: FastifyRequest<{ Params: { slug: string } }>,
  reply: FastifyReply,
) {
  const parsed = slugParamSchema.safeParse(req.params)
  if (!parsed.success) {
    return reply.status(400).send(error('Validation failed', parsed.error.flatten()))
  }
  const post = await postService.getPostBySlug(parsed.data.slug)
  if (!post) return reply.status(404).send(error('Post not found'))
  return reply.send(success(post))
}

export async function getById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) {
    return reply.status(400).send(error('Validation failed', parsed.error.flatten()))
  }
  const post = await postService.getPostById(parsed.data.id)
  if (!post) return reply.status(404).send(error('Post not found'))
  return reply.send(success(post))
}

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const parsed = createPostSchema.safeParse(req.body)
  if (!parsed.success) {
    return reply.status(400).send(error('Validation failed', parsed.error.flatten()))
  }
  const post = await postService.createPost(parsed.data)
  return reply.status(201).send(success(post))
}

export async function update(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const p = idParamSchema.safeParse(req.params)
  if (!p.success) return reply.status(400).send(error('Validation failed', p.error.flatten()))
  const b = updatePostSchema.safeParse(req.body)
  if (!b.success) return reply.status(400).send(error('Validation failed', b.error.flatten()))
  const post = await postService.updatePost(p.data.id, b.data)
  if (!post) return reply.status(404).send(error('Post not found'))
  return reply.send(success(post))
}

export async function remove(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const p = idParamSchema.safeParse(req.params)
  if (!p.success) return reply.status(400).send(error('Validation failed', p.error.flatten()))
  const ok = await postService.deletePost(p.data.id)
  if (!ok) return reply.status(404).send(error('Post not found'))
  return reply.send(success({ deleted: true }))
}
