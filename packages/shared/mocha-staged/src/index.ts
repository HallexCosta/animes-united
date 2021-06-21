#!/usr/bin/env node
import { checkForIsAppPackage, checkForIsSharedPackage } from './app-packages'
import { getStagedFiles } from './git-staged-area'

export function preapareStagedFiles(specFilePath: string): string {
  if (checkForIsSharedPackage(specFilePath)) {
    const spec = specFilePath.split('/').slice(3).join('/')

    return spec
  } else if (checkForIsAppPackage(specFilePath)) {
    const spec = specFilePath.split('/').slice(2).join('/')

    return spec
  }

  throw new Error(`ERROR: ${specFilePath} no is an app or shared package`)
}

console.log(getStagedFiles(preapareStagedFiles))
