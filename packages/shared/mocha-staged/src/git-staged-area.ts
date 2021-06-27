import { execSync } from 'child_process'
import { checkForIsAppPackage, checkForIsSharedPackage } from './app-packages'

export type SimpleStageFile = {
  scope: string
  file: string
}

export type StageFile = {
  scope: string
  files: string[]
}

export function getGitStagedAreaFiles(expression = '\\.spec\\.ts$'): string[] {
  const specs = execSync(
    `git diff --cached --name-only --diff-filter=ACM | grep ${expression}`
  ).toString()

  if (specs.indexOf('') === -1) {
    throw new Error('ERROR: nothing found files in staged area')
  }

  return specs.split('\n').filter(specFile => specFile !== '')
}

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

export function getStagedFiles(): SimpleStageFile[] {
  return getGitStagedAreaFiles().map(preapareStagedFiles)
}

export function separateByScope(stages: SimpleStageFile[]): StageFile[] {
  const stagedFiles: StageFile[] = []

  for (const { scope, file } of stages) {
    const alreadyScope = stagedFiles.find(staged => staged.scope === scope)

    if (alreadyScope) {
      stagedFiles.map(staged => staged.files.push(file))
    } else {
      const files = []
      files.push(file)

      stagedFiles.push({
        scope,
        files
      })
    }
  }

  return stagedFiles
}

export function runTests(stageFiles: StageFile[]): string {
  const outputs = []
  const commands = []

  for (const { scope, files } of stageFiles) {
    const specs = files.join(' ')
    const command = `yarn workspace @animes-united/${scope} test ${specs}`

    commands.push(command)
  }

  for (const command of commands) {
    const output = execSync(command, {
      stdio: 'inherit'
    })

    outputs.push(output)
  }

  return outputs.join('\n')
}
