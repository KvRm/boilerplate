import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { campaignModel } from '../../../model'

export const response = Type.Object({
  list: Type.Array(campaignModel),
  total: Type.Number(),
})

export type Response = Static<typeof response>
