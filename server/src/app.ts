import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

import { setupDb } from './db/setup'
import { setupCampaignModule } from './modules/campaign'
import { setupUserModule } from './modules/user'
import { setupLogger } from './services/logger'
import { generateUuid } from './utils/generate-uuid'
import { setupTypeboxFormats } from './utils/typebox-formats'

export async function build(opts = {}) {
  const app = fastify(opts)

  app.register(fastifyCors, {
    origin: process.env.NODE_ENV === 'development' ? [/localhost/] : [],
  })

  setupTypeboxFormats()
  setupLogger(app)
  await setupDb()

  setupUserModule(app)
  setupCampaignModule(app)

  app.setGenReqId(() => generateUuid())

  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403)
      return err.message
    }
    request.log.error({ err })
    reply.code(err.statusCode || 500)

    return 'There was an error processing your request.'
  })

  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404)
    return 'Couldn\'t find what you were looking for.'
  })

  return app
}
