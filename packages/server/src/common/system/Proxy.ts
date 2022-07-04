import httpProxy from 'http-proxy'

export interface IProxy {
  build(): string
  unBuild(): void
  setWSEndPoint(wsEndPoint: string): IProxy
  setOnConnected(onConnected: () => void): IProxy
  setOnDisconnected(onDisconnected: () => void): IProxy
}

export type ProxyConfigs = {
  host: string
  port: number
  ws: boolean
}

export enum ProxyConfigsEnum {
  PORT = 65337,
  WS = 1
}

export default class Proxy implements IProxy {
  private wsEndPoint: string
  private readonly host: string
  private readonly port: number
  private readonly ws: boolean
  private connection: httpProxy
  private customWSEndpoint: string

  private onConnected: () => void
  private onDisconnected: () => void

  public constructor(props: ProxyConfigs) {
    Object.assign(this, props)
  }

  public build(): string {
    const configs = {
      target: this.wsEndPoint,
      ws: this.ws,
      localAddress: this.host
    }

    this.connection = httpProxy.createServer(configs)

    this.connection.on('open', this.onConnected)
    this.connection.on('close', this.onDisconnected)

    this.connection.listen(this.port)

    this.customWSEndpoint = `ws://${this.host}:${this.port.toString()}`

    return this.customWSEndpoint
  }

  public unBuild(): void {
    this.connection.close()
  }

  public setWSEndPoint(wsEndPoint: string): IProxy {
    this.wsEndPoint = wsEndPoint
    return this
  }

  public setOnConnected(onConnected: () => void): IProxy {
    this.onConnected = onConnected
    return this
  }

  public setOnDisconnected(onDisconnected: () => void): IProxy {
    this.onDisconnected = onDisconnected
    return this
  }
}
