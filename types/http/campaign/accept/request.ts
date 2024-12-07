import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { campaignModel } from '../../../model'

export const request = Type.Pick(campaignModel, ['id'])

export type Request = Static<typeof request>
