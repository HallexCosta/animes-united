import { open } from 'fs/promises'

async function createSpecFile(filepath: string) {
  try {
    await open(filepath, 'a')
  } catch (e) {
    console.log(e)
  }
}

async function setup() {
  const filepath = `${__dirname}/unit/testing.spec.ts`
  await createSpecFile(filepath)
}

before(setup)
