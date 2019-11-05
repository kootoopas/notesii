export interface Logger {
  error(error: Error, meta?: Map<string, any>): void
}
