import type { Http } from 'types'
import { and, count, eq, getTableColumns, inArray, like, or } from 'drizzle-orm'
import { getOrderFn } from '../../db/helpers'
import { users } from '../../db/schema/users'
import { db } from '../../db/setup'
import { logger } from '../../services/logger'

export async function createOne(params: Http.User.Create.Request) {
  const [{ insertId }] = await db.insert(users).values(params)
  return { id: insertId }
}

export async function updateOne(params: Http.User.Update.Request) {
  await db.update(users).set(params).where(eq(users.id, params.id))
  return { id: params.id }
}

export async function removeOne(params: Http.User.Remove.Request) {
  const [{ affectedRows }] = await db.delete(users).where(eq(users.id, params.id))
  return !!affectedRows
}

export async function getOne(params: Http.User.GetEntity.Request) {
  const { password, ...cols } = getTableColumns(users)
  const user = await db.select(cols).from(users).where(eq(users.id, params.id))
  return user[0]!
}

export async function getMany(params: Http.User.GetList.Request) {
  const { filters, limit, page, order } = params

  const { password, ...cols } = getTableColumns(users)

  const queryBuilder = (fields: Parameters<typeof db.select>[0]) => {
    const value = db
      .select(fields)
      .from(users)
      .where(and(
        filters?.searchQuery
          ? or(
            like(users.firstName, `%${filters.searchQuery}%`),
            like(users.secondName, `%${filters.searchQuery}%`),
            like(users.lastName, `%${filters.searchQuery}%`),
            like(users.email, `%${filters.searchQuery}%`),
          )
          : undefined,
        filters?.ids ? inArray(users.id, filters.ids) : undefined,
      ))
      .limit(limit)
      .offset((page - 1) * limit)

    if (order) {
      value.orderBy(getOrderFn(order.direction)(users[order.field]))
    }

    return value
  }

  const listPromise = queryBuilder(cols).execute()
  const totalPromise = queryBuilder({ count: count(users.id) }).execute()

  const [list, total] = await Promise.all([listPromise, totalPromise])

  return { list: list as Http.User.GetList.Response['list'], total: total[0]?.count as number }
}
