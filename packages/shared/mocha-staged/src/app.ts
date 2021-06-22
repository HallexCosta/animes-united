#!/usr/bin/env node
import { checkForIsAppPackage, checkForIsSharedPackage } from './app-packages'
import {
  SimpleStageFile,
  getStagedFiles,
  runTests,
  separateByScope
} from './git-staged-area'

export function preapareStagedFiles(specFilePath: string): SimpleStageFile {
  if (checkForIsSharedPackage(specFilePath)) {
    const scope = specFilePath.split('/')[2]
    const file = specFilePath.split('/').slice(3).join('/')

    return {
      scope,
      file
    }
  } else if (checkForIsAppPackage(specFilePath)) {
    const scope = specFilePath.split('/')[1]
    const file = specFilePath.split('/').slice(2).join('/')

    return {
      scope,
      file
    }
  }

  throw new Error(`ERROR: ${specFilePath} no is an app or shared package`)
}

const simpleStageFiles = getStagedFiles(preapareStagedFiles)
const stageFiles = separateByScope(simpleStageFiles)
runTests(stageFiles)
