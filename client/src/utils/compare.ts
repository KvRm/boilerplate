import { Value } from '@sinclair/typebox/value'
import destr from 'destr'

export function compare<T>(elem1: T, elem2: T): boolean {
  /** JSON.stringify для удаления undefined свойств */
  return Value.Equal(destr(JSON.stringify(elem1)), destr(JSON.stringify(elem2)))
}
