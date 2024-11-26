import mysql from 'mysql2/promise';
import { logger } from './logger';

export let query: mysql.Connection['query'] = () => { throw Error('MySql client not awailable') }

export async function setupDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    query = (async (text: string, values: Array<string | number>) => {
        const start = Date.now()
        const res = await connection.query(text, values)
        const duration = Date.now() - start
        logger.info(text)
        logger.info(res[0])
        logger.info(`duration: ${duration}`)
        return res
    }) as mysql.Connection['query']
}