export interface IProxy {
  build(): string
  setWSEndPoint(wsEndPoint: string): void
  setOnConnected(onConnected: () => void): IProxy
  setOnDisconnected(onDisconnected: () => void): IProxy
}
