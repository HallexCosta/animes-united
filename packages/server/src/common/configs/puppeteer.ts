import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') })

type PuppeteerLaunchConfig = {
  executablePath: string
  headless: boolean
  args: string[]
}

const debug: boolean = process.env.PUPPETEER_DEBUG === 'true'
const chromeExecutablePath =
  process.env.PUPPETEER_EXEC_PATH ??
  process.env.PUPPETEER_CHROME_EXECUTABLE_PATH

let launch: PuppeteerLaunchConfig

if (chromeExecutablePath) {
  launch = {
    executablePath: String(chromeExecutablePath),
    headless: !debug,
    args: [
      '--no-sandbox',
      `--disable-extensions-except=${chromeExecutablePath}`,
      `--load-extension=${chromeExecutablePath}`
    ]
  }
} else {
  launch = {} as PuppeteerLaunchConfig
}

export { launch }
