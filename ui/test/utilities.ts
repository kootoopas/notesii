import {format} from 'date-fns'

// @ts-ignore
import {Mock} from 'jest'

export function asMock(f: Function): Mock {
  return f as unknown as Mock
}

export function getDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss:SSS')
}
