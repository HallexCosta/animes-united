import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') })

type PuppeteerLaunchConfig = {
  executablePath: string
  headless: boolean
  args: string[]
}

const debug: boolean = process.env.PUPPETEER_DEBUG === 'true'

export const launch: PuppeteerLaunchConfig = {
  executablePath: path.join('/', 'mnt', 'c', 'chrome-win', 'chrome.exe'),
  headless: !debug,
  args: ['--no-sandbox']
}
