import { promises } from 'fs'
import { execSync } from 'child_process'
import { promisify } from 'util'

const { open, unlink } = promises

const exec = promisify(execSync)

export async function createSpecFile(filepath: string): Promise<void> {
  await open(filepath, 'a')
}

export async function deleteSpecFile(filepath: string): Promise<void> {
  await unlink(filepath)
}

export async function moveSpecFileToStageArea(filepath: string): Promise<void> {
  exec(`git add ${filepath}`)
}

export async function moveSpecFileOutsideToStageArea(
  filepath: string
): Promise<void> {
  exec(`git reset HEAD ${filepath}`)
}
