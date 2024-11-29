import { type TSchema, Type } from '@sinclair/typebox'

export function optionalOrNull<T extends TSchema>(schema: T) {
  return Type.Optional(Type.Union([Type.Null(), schema]))
}
