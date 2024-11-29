import { Type } from '@sinclair/typebox'

export const timestamps = {
  createdAt: Type.Date(),
  updatedAt: Type.Union([Type.Null(), Type.Date()]),
}
