import type { Static } from '@sinclair/typebox'
import { Pick } from '@sinclair/typebox'
import { userModel } from '../../../model'

export const request = Pick(userModel, ['id'])

export type Request = Static<typeof request>
