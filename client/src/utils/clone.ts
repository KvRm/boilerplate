import { Value } from '@sinclair/typebox/value'

export function clone<T>(value: T): T {
  return Value.Clone(value)
}
