export function omit<T extends object, K extends keyof T>(value: T, keys: K[]): Omit<T, K> {
  const result = Object.assign({}, value)

  keys.forEach((key) => {
    delete result[key]
  })

  return result
}
