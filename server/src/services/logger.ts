import { FastifyInstance } from "fastify";
import pino from 'pino';

export let logger = {} as pino.BaseLogger

export function setupLogger(app: FastifyInstance) {
    logger = app.log
}
