import { FastifyInstance, FastifyReply } from "fastify";
import { TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { isJsonRpcRequest, jsonRpcError } from "./json-rpc";
import { JsonRpcError, JsonRpcRequest, JsonRpcResult } from "types";
import { logger } from "../services/logger";

export type Handler<Params = unknown, Response = unknown> = (
  params: Params,
  reply: FastifyReply
) =>
  | Promise<JsonRpcResult<Response>>
  | JsonRpcResult<Response>
  | Promise<JsonRpcError<unknown>>
  | JsonRpcError<unknown>;

export type Route<Params = unknown, Response = unknown> = {
  path: string;
  handler: Handler<Params, Response>;
};

export function makeHandler<Params = unknown, Response = unknown>(
  requestSchema: TSchema,
  responseSchema: TSchema,
  handler: Handler<Params, Response>
) {
  return async (request: JsonRpcRequest<Params>, reply: FastifyReply) => {
    if (!isJsonRpcRequest(request)) {
      return jsonRpcError(reply, "Request should match jsonRpc schema");
    }

    try {
      Value.Assert(requestSchema, request.params);
    } catch (err) {
      logger.error(err);
      return jsonRpcError(reply, "Invalid params");
    }

    const result = await handler(request.params, reply);

    if (!(result as JsonRpcError)?.error) {
      logger.info(result);
      try {
        Value.Assert(responseSchema, (result as JsonRpcResult).result);
      } catch (err) {
        logger.error(err);
        return jsonRpcError(reply, "Invalid response");
      }
    }

    return result;
  };
}

export function setupRoutes(fastify: FastifyInstance, routes: Array<Route>) {
  routes.forEach(({ path, handler }) => {
    fastify.post(path, (request, reply) => handler(request.body, reply));
  });
}
