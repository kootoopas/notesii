import {format} from 'date-fns'

// @ts-ignore
import {SpyInstance} from 'jest'

export function asMock(f: Function): SpyInstance {
  return f as unknown as SpyInstance
}

export function getDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss:SSS')
}
