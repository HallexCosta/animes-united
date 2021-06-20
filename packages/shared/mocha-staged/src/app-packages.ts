import { join } from 'path'
import { readdirSync as readDirectory } from 'fs'

type MergePackagesParams = {
  appPackages: string[]
  sharedPackages: string[]
}

export function checkForIsAppPackage(specFilePath: string): boolean {
  const directory = specFilePath.split('/')
  const appPackages = getAppPackages()

  if (appPackages.includes(directory[1])) {
    return true
  }

  return false
}

export function checkForIsSharedPackage(specFilePath: string): boolean {
  const directory = specFilePath.split('/')
  const sharedPackages = getSharedPackages()

  if (sharedPackages.includes(directory[2])) {
    return true
  }

  return false
}

export function getAppPackages(): string[] {
  return readDirectory(join(__dirname, '..', '..', '..', '..', 'packages'), {
    withFileTypes: true
  })
    .filter(entry => entry.isDirectory())
    .map(dir => (dir.name === 'shared' ? '' : dir.name))
    .filter(name => name !== '')
}

export function getSharedPackages(): string[] {
  return readDirectory(
    join(__dirname, '..', '..', '..', '..', 'packages', 'shared'),
    { withFileTypes: true }
  )
    .filter(entry => entry.isDirectory())
    .map(dir => dir.name)
}

export function mergePacakges({
  appPackages,
  sharedPackages
}: MergePackagesParams): string[] {
  return appPackages.concat(sharedPackages)
}
