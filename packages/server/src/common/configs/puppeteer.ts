import path from 'path'
import 'dotenv/config'

type PuppeteerLaunchConfig = {
  executablePath: string
  headless: boolean
  args: string[]
}

const debug: boolean =
  process.env.PUPPETEER_DEBUG === 'true' ||
  process.env.PUPPETEER_DEBUG === 'TRUE'

export const launch: PuppeteerLaunchConfig = {
  executablePath: path.join('/', 'mnt', 'c', 'chrome-win', 'chrome.exe'),
  headless: !debug,
  args: ['--no-sandbox']
}
