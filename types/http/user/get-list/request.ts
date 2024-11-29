import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { getBaseListParams } from '../../../helpers/base-list-params'

const orderFields = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const

export const request = Type.Object({
  ...getBaseListParams(Type.Enum(orderFields)),

  filters: Type.Optional(
    Type.Object({
      ids: Type.Optional(Type.Array(Type.Number())),
      searchQuery: Type.Optional(Type.String()),
    }),
  ),
})

export type Request = Static<typeof request>
