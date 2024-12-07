import type { TSchema } from '@sinclair/typebox'
import type { FastifyInstance, FastifyReply } from 'fastify'
import type { JsonRpcError, JsonRpcRequest, JsonRpcResult } from 'types'
import { Value } from '@sinclair/typebox/value'
import { logger } from '../services/logger'
import { isJsonRpcRequest, jsonRpcError } from './json-rpc'

export type Handler<Params = unknown, Response = unknown> = (
  params: Params,
  reply: FastifyReply
) =>
  | Promise<JsonRpcResult<Response>>
  | JsonRpcResult<Response>
  | Promise<JsonRpcError>
  | JsonRpcError

export interface Route<Params = unknown, Response = unknown> {
  path: string
  handler: Handler<Params, Response>
}

export function makeHandler<Params = unknown, Response = unknown>(
  requestSchema: TSchema,
  responseSchema: TSchema,
  handler: Handler<Params, Response>,
) {
  return async (request: JsonRpcRequest<Params>, reply: FastifyReply) => {
    if (!isJsonRpcRequest(request)) {
      return jsonRpcError(reply, 'Request should match jsonRpc schema')
    }

    try {
      Value.Assert(requestSchema, request.params)
    }
    catch (err) {
      logger.error(err)
      return jsonRpcError(reply, 'Invalid params')
    }

    const result = await handler(request.params, reply)

    if (!(result as JsonRpcError)?.error) {
      logger.info(result)
      try {
        Value.Assert(responseSchema, (result as JsonRpcResult).result)
      }
      catch (err) {
        logger.error(err)
        return jsonRpcError(reply, 'Invalid response')
      }
    }

    return result
  }
}

export function setupRoutes(fastify: FastifyInstance, routes: Array<Route>) {
  routes.forEach(({ path, handler }) => {
    fastify.post(path, (request, reply) => handler(request.body, reply))
  })
}
