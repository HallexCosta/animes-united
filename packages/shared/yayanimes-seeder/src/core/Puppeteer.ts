import puppeteer, { Browser, Page } from 'puppeteer'

import { getIPv4, launch } from '@common/configs/puppeteer'
import Proxy, {
  IProxy,
  ProxyConfigs,
  ProxyConfigsEnum
} from '@core/Proxy'

export default abstract class Puppeteer {
  private proxy: IProxy
  private configs: ProxyConfigs

  protected constructor(private withProxy: () => boolean = () => false) { }

  private buildNewProxy(configs: ProxyConfigs) {
    this.proxy = new Proxy(configs)
      .setOnConnected(this.onProxyConnected())
      .setOnDisconnected(this.onProxyDisconnected())
  }

  private async buildWSEndPoint(browser: Browser): Promise<string> {
    const wsEndPoint = browser.wsEndpoint()
    const customWSEndpoint = this.proxy.setWSEndPoint(wsEndPoint).build()
    return customWSEndpoint
  }

  private async newBrowser(): Promise<Browser> {
    let browser = await puppeteer.launch(launch)

    if (this.withProxy()) {
      this.configs = {
        host: getIPv4(),
        port: ProxyConfigsEnum.PORT,
        ws: !!ProxyConfigsEnum.WS
      }

      this.buildNewProxy(this.configs)

      const customWSEndpoint = await this.buildWSEndPoint(browser)
      browser = await puppeteer.connect({
        ignoreHTTPSErrors: true,
        browserWSEndpoint: customWSEndpoint
      })

      this.closeProxy()
    }

    return browser
  }

  protected async initPage(): Promise<{ browser: Browser; page: Page }> {
    const browser = await this.newBrowser()

    const page = await browser.newPage()

    return { browser, page }
  }

  protected async closePages(browser: Browser): Promise<void> {
    for await (const page of await browser.pages()) {
      await page.close()
    }
  }

  protected async closeBrowser(browser: Browser): Promise<void> {
    await browser.close()
  }

  private closeProxy(): void {
    this.proxy.unBuild()
  }

  protected onProxyConnected(): () => void {
    return () => {
      console.log('> Client proxy connected')
    }
  }

  protected onProxyDisconnected(): () => void {
    return () => {
      console.log('> Client proxy disconnected')
    }
  }
}
