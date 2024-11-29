import type { FastifyInstance } from 'fastify'
import { Http } from 'types'

import { makeHandler, setupRoutes } from '../setup'

import { createHandler } from './services/create'
import { getEntityHandler } from './services/get-entity'
import { getListHandler } from './services/get-list'
import { removeHandler } from './services/remove'
import { updateHandler } from './services/update'

export async function setupUserModule(app: FastifyInstance) {
  const routes = [
    {
      path: Http.User.methodList.getList.path,
      handler: makeHandler(
        Http.User.GetList.request,
        Http.User.GetList.response,
        getListHandler,
      ),
    },
    {
      path: Http.User.methodList.getEntity.path,
      handler: makeHandler(
        Http.User.GetEntity.request,
        Http.User.GetEntity.response,
        getEntityHandler,
      ),
    },
    {
      path: Http.User.methodList.create.path,
      handler: makeHandler(
        Http.User.Create.request,
        Http.User.Create.response,
        createHandler,
      ),
    },
    {
      path: Http.User.methodList.update.path,
      handler: makeHandler(
        Http.User.Update.request,
        Http.User.Update.response,
        updateHandler,
      ),
    },
    {
      path: Http.User.methodList.remove.path,
      handler: makeHandler(
        Http.User.Remove.request,
        Http.User.Remove.response,
        removeHandler,
      ),
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  setupRoutes(app, routes)
}
