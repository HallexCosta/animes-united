import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

type PuppeteerLaunchConfig = {
  executablePath: string
  headless: boolean
  args: string[]
}

export const gotoURI = 'https://yayanimes.net'

export const launch: PuppeteerLaunchConfig = {
  executablePath: path.join('/', 'mnt', 'c', 'chrome-win', 'chrome.exe'),
  headless: Boolean(!process.env.DEBUG),
  args: ['--no-sandbox']
}
