import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const response = Type.Object({ isSuccess: Type.Boolean() })

export type Response = Static<typeof response>
