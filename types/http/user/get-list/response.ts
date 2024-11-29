import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { userModel } from '../../../model'

const user = Type.Omit(userModel, ['password'], { additionalProperties: false })

export const response = Type.Object({
  list: Type.Array(user),
  total: Type.Number(),
})

export type Response = Static<typeof response>
