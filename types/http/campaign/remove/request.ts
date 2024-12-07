import type { Static } from '@sinclair/typebox'
import { Pick } from '@sinclair/typebox'
import { campaignModel } from '../../../model'

export const request = Pick(campaignModel, ['id'])

export type Request = Static<typeof request>
