import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') })

type PuppeteerLaunchConfig = {
  executablePath?: string
  headless: boolean
  args: string[]
}

const debug: boolean = process.env.PUPPETEER_DEBUG === 'true'
const executablePath = process.env.PUPPETEER_EXEC_PATH

const launch: PuppeteerLaunchConfig = {
  executablePath,
  headless: !debug,
  args: ['--no-sandbox']
}

export { launch }
