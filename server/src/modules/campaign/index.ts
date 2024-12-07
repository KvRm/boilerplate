import type { FastifyInstance } from 'fastify'
import { Http } from 'types'

import { makeHandler, setupRoutes } from '../setup'

import { acceptHandler } from './services/accept'
import { createHandler } from './services/create'
import { getEntityHandler } from './services/get-entity'
import { getListHandler } from './services/get-list'
import { removeHandler } from './services/remove'
import { updateHandler } from './services/update'

export async function setupCampaignModule(app: FastifyInstance) {
  const routes = [
    {
      path: Http.Campaign.methodList.getList.path,
      handler: makeHandler(Http.Campaign.GetList.request, Http.Campaign.GetList.response, getListHandler),
    },
    {
      path: Http.Campaign.methodList.getEntity.path,
      handler: makeHandler(Http.Campaign.GetEntity.request, Http.Campaign.GetEntity.response, getEntityHandler),
    },
    {
      path: Http.Campaign.methodList.create.path,
      handler: makeHandler(Http.Campaign.Create.request, Http.Campaign.Create.response, createHandler),
    },
    {
      path: Http.Campaign.methodList.update.path,
      handler: makeHandler(Http.Campaign.Update.request, Http.Campaign.Update.response, updateHandler),
    },
    {
      path: Http.Campaign.methodList.remove.path,
      handler: makeHandler(Http.Campaign.Remove.request, Http.Campaign.Remove.response, removeHandler),
    },
    {
      path: Http.Campaign.methodList.accept.path,
      handler: makeHandler(Http.Campaign.Accept.request, Http.Campaign.Accept.response, acceptHandler),
    },
  ]
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  setupRoutes(app, routes)
}
