import { type Static, Type } from '@sinclair/typebox'
import { campaignModel } from '../../../model'

export const response = campaignModel

export type Response = Static<typeof response>
