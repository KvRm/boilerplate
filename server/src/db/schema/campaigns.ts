import { mysqlTable as table } from 'drizzle-orm/mysql-core'
import * as t from 'drizzle-orm/mysql-core'
import { schemaHelper } from '../helpers'
import { users } from './users'

export const campaigns = table(
  'campaigns',
  {
    id: t.int().primaryKey().autoincrement(),
    name: t.varchar({ length: 256 }).unique().notNull(),
    description: t.varchar({ length: 2000 }),
    executedAt: t.timestamp('executed_at'),
    status: t.varchar({ length: 256 }).notNull(),

    updaterId: t.int('updater_id').references(() => users.id),

    ...schemaHelper.timestamps,
  },
  (table) => {
    return {
      nameIndex: t.uniqueIndex('name_idx').on(table.name),
    }
  },
)
