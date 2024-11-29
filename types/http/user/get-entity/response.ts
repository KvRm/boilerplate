import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { userModel } from '../../../model'

export const response = Type.Omit(userModel, ['password'], { additionalProperties: false })

export type Response = Static<typeof response>
