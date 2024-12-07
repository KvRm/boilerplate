import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { optionalOrNull } from '../../helpers/optional-or-null'
import { timestamps } from '../../helpers/timestamps'

export const userModel = Type.Object({
  id: Type.Number(),

  firstName: Type.String({ minLength: 1 }),
  lastName: Type.String({ minLength: 1 }),
  secondName: optionalOrNull(Type.String({ minLength: 1 })),
  email: Type.String({ format: 'email' }),
  phone: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 8 }),

  department: optionalOrNull(Type.String({ minLength: 1 })),
  jobTitle: optionalOrNull(Type.String({ minLength: 1 })),

  ...timestamps,
}, { additionalProperties: false })

export type UserModel = Static<typeof userModel>
