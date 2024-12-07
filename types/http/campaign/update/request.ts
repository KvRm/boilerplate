import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { campaignModel } from '../../../model'

export const request = Type.Omit(
  campaignModel,
  [
    'createdAt',
    'updatedAt',
    'executedAt',
    'updaterId',
    'status',
  ],
  { additionalProperties: false },
)

export type Request = Static<typeof request>
