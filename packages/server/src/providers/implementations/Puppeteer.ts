import * as config from '@common/configs/puppeteer'
import puppeteer, { Browser, Page } from 'puppeteer'

export abstract class Puppeteer {
  protected async initPage(): Promise<{ browser: Browser; page: Page }> {
    const browser = await puppeteer.launch(config.launch)
    const page = await browser.newPage()

    return { browser, page }
  }

  protected async closePages(browser: Browser): Promise<void> {
    for await (const page of await browser.pages()) {
      await page.close()
    }
  }
}
