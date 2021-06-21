import { moveSpecFileToStageArea, createSpecFile } from './functions'

async function setup() {
  const filepath = `${__dirname}/unit/testing.spec.ts`
  await createSpecFile(filepath)
  await moveSpecFileToStageArea(filepath)
}

before(setup)
