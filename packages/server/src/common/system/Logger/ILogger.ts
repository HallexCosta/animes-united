export interface ILogger {
  write(message: string): Promise<void>
  read(): Promise<string>
  create(): Promise<void>
}
