import { execSync } from 'child_process'

export function getGitStagedAreaFiles(regex = '\\.spec\\.ts$'): string[] {
  const specs = execSync(
    `git diff --cached --name-only --diff-filter=ACM | grep ${regex}`
  ).toString()

  if (specs.indexOf('') === -1) {
    throw new Error('ERROR: nothing found files in staged area')
  }

  return specs.split('\n').filter(specFile => specFile !== '')
}

export function getStagedFiles(
  preapareStagedFiles: (specFile: string) => string
): string {
  return getGitStagedAreaFiles().map(preapareStagedFiles).join(' ')
}
