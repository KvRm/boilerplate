import fastify from "fastify";
import pino from 'pino'

import { setupUserModule } from "./modules/user";

import { generateUuid } from './utils/generate-uuid'
import { setupDb } from "./services/db";
import { setupLogger } from "./services/logger";

export let log = {} as pino.BaseLogger

export async function build(opts = {}) {
  const app = fastify(opts);

  setupLogger(app)
  await setupDb()

  setupUserModule(app)

  app.setGenReqId(() => generateUuid())

  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403);
      return err.message;
    }
    request.log.error({ err });
    reply.code(err.statusCode || 500);

    return "There was an error processing your request.";
  });

  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404);
    return "Couldn't find what you were looking for.";
  });

  log = app.log
  

  return app;
}
