import path from 'path'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
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
  headless: true,
  args: ['--no-sandbox']
}

export function getIPv4(): string {
  const ifconfig = execSync('ifconfig eth0 | grep inet').toString()
  const regex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/

  if (!regex.test(ifconfig)) throw new Error('IPV4: no found valid ip address')

  const ipMatch = ifconfig.match(regex)
  const ip = ipMatch ? ipMatch[0].trim() : '127.0.0.1'
  return ip
}

export { launch }
