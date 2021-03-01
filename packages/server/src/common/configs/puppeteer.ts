import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') })

type PuppeteerLaunchConfig = {
  executablePath: string
  headless: boolean
  args: string[]
}

const debug: boolean = process.env.PUPPETEER_DEBUG === 'true'
const chromeExecutablePath = process.env.PUPPETEER_CHROME_EXECUTABLE_PATH

export const launch: PuppeteerLaunchConfig = {
  executablePath: String(chromeExecutablePath),
  headless: !debug,
  args: ['--no-sandbox']
}
