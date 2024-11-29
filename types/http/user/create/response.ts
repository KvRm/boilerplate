import type { Static } from '@sinclair/typebox'
import { Pick } from '@sinclair/typebox'
import { userModel } from '../../../model'

export const response = Pick(userModel, ['id'])

export type Response = Static<typeof response>
