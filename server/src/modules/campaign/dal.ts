import { and, count, eq, getTableColumns, inArray, like, or } from 'drizzle-orm'
import { type Http, Model } from 'types'
import { getOrderFn } from '../../db/helpers'
import { campaigns } from '../../db/schema/campaigns'
import { db } from '../../db/setup'
import { logger } from '../../services/logger'

export async function getOneByName(name: string) {
  const campaign = await db.select().from(campaigns).where(eq(campaigns.name, name))
  return campaign[0] as Model.CampaignModel
}

export async function createOne(params: Omit<Model.CampaignModel, 'id' | 'executedAt' | 'createdAt' | 'updaterId' | 'updatedAt' | 'status'>) {
  const [{ insertId }] = await db.insert(campaigns).values({ ...params, status: Model.campaingStatus.draft })
  return { id: insertId }
}

export async function updateOne(params: Omit<Model.CampaignModel, 'executedAt' | 'createdAt' | 'updaterId' | 'updatedAt' | 'status'>) {
  await db.update(campaigns).set(params).where(eq(campaigns.id, params.id))
  return { id: params.id }
}

export async function accept(params: Http.Campaign.Accept.Request) {
  await db.update(campaigns).set({ status: Model.campaingStatus.active }).where(eq(campaigns.id, params.id))
  return { id: params.id }
}

export async function removeOne(params: Http.Campaign.Remove.Request) {
  const [{ affectedRows }] = await db.delete(campaigns).where(eq(campaigns.id, params.id))
  return !!affectedRows
}

export async function getOne(params: Http.Campaign.GetEntity.Request) {
  const campaign = await db.select().from(campaigns).where(eq(campaigns.id, params.id))
  return campaign[0] as Model.CampaignModel
}

export async function getMany(params: Http.Campaign.GetList.Request) {
  const { filters, limit, page, order } = params

  const queryBuilder = (fields: Parameters<typeof db.select>[0]) => {
    const value = db
      .select(fields)
      .from(campaigns)
      .where(and(
        filters?.searchQuery
          ? or(like(campaigns.name, `%${filters.searchQuery}%`))
          : undefined,
        filters?.ids ? inArray(campaigns.id, filters.ids) : undefined,
      ))
      .limit(limit)
      .offset((page - 1) * limit)

    if (order) {
      value.orderBy(getOrderFn(order.direction)(campaigns[order.field]))
    }

    return value
  }

  const listPromise = queryBuilder(getTableColumns(campaigns)).execute()
  const totalPromise = queryBuilder({ count: count(campaigns.id) }).execute()

  const [list, total] = await Promise.all([listPromise, totalPromise])

  return { list: list as Model.CampaignModel[], total: total[0]?.count as number }
}
