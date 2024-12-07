import type { FastifyReply } from 'fastify'
import type { JsonRpcError, JsonRpcResult } from 'types'
import { Type } from '@sinclair/typebox'
import { Assert } from '@sinclair/typebox/value'
import { logger } from '../services/logger'
import { generateUuid } from '../utils/generate-uuid'

export function isJsonRpcRequest<T>(value: T): boolean {
  const schema = Type.Object({
    id: Type.String(),
    jsonrpc: Type.Literal('2.0'),
    params: Type.Any(),
  })
  try {
    Assert(schema, value)
  }
  catch (err) {
    logger.error(err)
    return false
  }
  return true
}

export function jsonRpcResult<T>(value: T): JsonRpcResult<T> {
  return {
    id: generateUuid(),
    jsonrpc: '2.0',
    result: value,
  }
}

export function jsonRpcError(
  reply: FastifyReply,
  value: string,
): JsonRpcError {
  reply.code(201)
  return {
    id: generateUuid(),
    jsonrpc: '2.0',
    error: value,
  }
}
