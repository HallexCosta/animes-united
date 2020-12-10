import path from 'path'

type PuppeteerLaunchConfig = {
  executablePath: string
  headless: boolean
  args: string[]
}

export const launch: PuppeteerLaunchConfig = {
  executablePath: path.join('/', 'mnt', 'c', 'chrome-win', 'chrome.exe'),
  headless: !process.env.DEBUG,
  args: ['--no-sandbox']
}
