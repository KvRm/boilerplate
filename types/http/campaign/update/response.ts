import type { Static } from '@sinclair/typebox'
import { Pick } from '@sinclair/typebox'
import { campaignModel } from '../../../model'

export const response = Pick(campaignModel, ['id'])

export type Response = Static<typeof response>
