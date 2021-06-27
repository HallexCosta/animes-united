import { moveSpecFileToStageArea, createSpecFile } from './functions'

async function setup() {
  const filepath = `${__dirname}/unit/testing.spec.ts`
  const filepath2 = `${__dirname}/unit/testing2.spec.ts`
  await createSpecFile(filepath)
  await createSpecFile(filepath2)
  await moveSpecFileToStageArea(filepath)
  await moveSpecFileToStageArea(filepath2)
}

before(setup)
