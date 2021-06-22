#!/usr/bin/env node
import { getStagedFiles, separateByScope, runTests } from './git-staged-area'

function app() {
  try {
    const simpleStageFiles = getStagedFiles()
    const stageFiles = separateByScope(simpleStageFiles)
    const output = runTests(stageFiles)

    console.log(output)
  } catch (e) {
    console.log(e)
  }
}

app()
