export interface IProxy {
  build(): string
  unBuild(): void
  setWSEndPoint(wsEndPoint: string): IProxy
  setOnConnected(onConnected: () => void): IProxy
  setOnDisconnected(onDisconnected: () => void): IProxy
}
