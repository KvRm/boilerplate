import { SetErrorFunction, ValueErrorType } from '@sinclair/typebox/errors'

function plural(choice: number, choicesLength: number) {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  if (!teen && endsWithOne) {
    return 1
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

function minLengthErrPlural(n: number) {
  return [
    `Длина должна быть больше ${n} символов`,
    `Длина должна быть больше ${n} символа`,
    `Длина должна быть больше ${n} символов`,
    `Длина должна быть больше ${n} символов`,
  ][plural(n, 4)]
}
function maxLengthErrPlural(n: number) {
  return [
    `Длина должна быть меньше ${n} символов`,
    `Длина должна быть меньше ${n} символа`,
    `Длина должна быть меньше ${n} символов`,
    `Длина должна быть меньше ${n} символов`,
  ][plural(n, 4)]
}

export function setupTypeboxErrors() {
  SetErrorFunction(({ errorType, schema }) => {
    if (errorType === ValueErrorType.StringMinLength) {
      return minLengthErrPlural(Number(schema.minLength))
    }
    if (errorType === ValueErrorType.StringMaxLength) {
      return maxLengthErrPlural(Number(schema.minLength))
    }
    if (errorType === ValueErrorType.StringFormat) {
      if (schema.format === 'email') {
        return 'Ожидалось значение в формате email'
      }
      if (schema.format === 'date') {
        return 'Ожидалось значение в формате даты'
      }
    }

    return 'Некорректное значение'
  })
}
