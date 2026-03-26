import consola from 'consola'
import { env } from './config/env.js'
import { buildApp } from './app.js'

async function main() {
  const app = await buildApp()
  await app.listen({ port: env.port, host: '0.0.0.0' })
  consola.success(`Elegant Blog API ready at http://localhost:${env.port}`)
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
})
