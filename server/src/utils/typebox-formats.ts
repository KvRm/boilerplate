import { TypeSystem } from '@sinclair/typebox/system'

const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/
const TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

function isDate(value: string): boolean {
  const matches: string[] | null = DATE.exec(value)

  if (!matches)
    return false
  const year: number = +matches[1]!
  const month: number = +matches[2]!
  const day: number = +matches[3]!

  return (
    month >= 1
    && month <= 12
    && day >= 1
    && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]!)
  )
}

function isTime(value: string, strictTimeZone?: boolean): boolean {
  const matches: string[] | null = TIME.exec(value)

  if (!matches)
    return false
  const hr: number = +matches[1]!
  const min: number = +matches[2]!
  const sec: number = +matches[3]!
  const tz: string | undefined = matches[4]
  const tzSign: number = matches[5] === '-' ? -1 : 1
  const tzH: number = +(matches[6] || 0)
  const tzM: number = +(matches[7] || 0)

  if (tzH > 23 || tzM > 59 || (strictTimeZone && !tz))
    return false
  if (hr <= 23 && min <= 59 && sec < 60)
    return true
  const utcMin = min - tzM * tzSign
  const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0)

  return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61
}

let isRunned = false
export function setupTypeboxFormats() {
  if (isRunned)
    return
  isRunned = true

  TypeSystem.Format('date', value => isDate(value))

  TypeSystem.Format('time', value => isTime(value))

  TypeSystem.Format('email', value =>
    // eslint-disable-next-line regexp/prefer-w
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
      value,
    ))

  // eslint-disable-next-line regexp/no-useless-non-capturing-group, regexp/optimal-quantifier-concatenation, regexp/negation
  TypeSystem.Format('uri', value => /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i.test(value))

  TypeSystem.Format('uuid', value =>
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value))

  TypeSystem.Format('ipv4', value =>
    /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(value))
};
