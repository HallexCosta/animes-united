export interface ILogger {
  read(): Promise<string>
  create(): Promise<void>
}
