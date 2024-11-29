import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { userModel } from '../../../model'

export const request = Type.Omit(userModel, ['id', 'createdAt', 'updatedAt'], {
  additionalProperties: false,
})

export type Request = Static<typeof request>
