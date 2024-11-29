import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { userModel } from '../../../model'

export const request = Type.Omit(
  userModel,
  ['password', 'createdAt', 'updatedAt'],
  { additionalProperties: false },
)

export type Request = Static<typeof request>
