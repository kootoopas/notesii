import {Logger} from './Logger'

export default class ConsoleLogger implements Logger {
  error(error: Error, meta: Map<string, any>): void {
    console.error(error)
    meta && meta.forEach((value, key) => {
      console.error(`${key}: ${value}`)
    })
  }
}
