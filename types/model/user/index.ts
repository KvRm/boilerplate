import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { optionalOrNull } from '../../helpers/optional-or-null'
import { timestamps } from '../../helpers/timestamps'

export const userModel = Type.Object({
  id: Type.Number(),

  firstName: Type.String(),
  lastName: Type.String(),
  secondName: optionalOrNull(Type.String()),
  email: Type.String(),
  phone: Type.String(),
  password: Type.String(),

  department: optionalOrNull(Type.String()),
  jobTitle: optionalOrNull(Type.String()),

  ...timestamps,
}, { additionalProperties: false })

export type UserModel = Static<typeof userModel>
