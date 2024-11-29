import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { optionalOrNull } from '../../helpers/optional-or-null'
import { timestamps } from '../../helpers/timestamps'

export const campaingStatus = {
  draft: 'draft',
  active: 'active',
} as const

export const campaignModel = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  executedAt: optionalOrNull(Type.Date()),
  status: Type.Enum(campaingStatus),

  updaterId: optionalOrNull(Type.Number()),

  ...timestamps,
}, { additionalProperties: false })

export type CampaignModel = Static<typeof campaignModel>
