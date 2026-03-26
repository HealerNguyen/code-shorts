import type { FastifyInstance } from 'fastify'
import * as postController from './post.controller.js'

export async function postRoutes(app: FastifyInstance) {
  app.get('/', postController.list)
  app.get('/slug/:slug', postController.getBySlug)
  app.get('/:id', postController.getById)
  app.post('/', postController.create)
  app.patch('/:id', postController.update)
  app.delete('/:id', postController.remove)
}
