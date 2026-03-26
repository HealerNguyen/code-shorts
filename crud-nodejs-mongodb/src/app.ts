import cors from '@fastify/cors'
import Fastify from 'fastify'
import type { FastifyServerOptions } from 'fastify'
import { env } from './config/env.js'
import { postRoutes } from './modules/post/post.route.js'
import { success } from './utils/response.js'

/** Dev: colored, human-readable logs via pino-pretty. Prod: JSON lines (default Pino). */
function loggerOptions(): FastifyServerOptions['logger'] {
  if (env.nodeEnv === 'production') {
    return true
  }
  return {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss',
        ignore: 'pid,hostname',
        singleLine: false,
      },
    },
  }
}

export async function buildApp() {
  const app = Fastify({ logger: loggerOptions() })

  await app.register(cors, { origin: true })

  app.get('/health', async (_req, reply) => {
    return reply.send(success({ ok: true }))
  })

  await app.register(postRoutes, { prefix: '/api/posts' })

  return app
}
