import { moveSpecFileOutsideToStageArea, deleteSpecFile } from './functions'

async function teardown() {
  const filepath = `${__dirname}/unit/testing.spec.ts`
  const filepath2 = `${__dirname}/unit/testing2.spec.ts`
  await moveSpecFileOutsideToStageArea(filepath)
  await moveSpecFileOutsideToStageArea(filepath2)
  await deleteSpecFile(filepath)
  await deleteSpecFile(filepath2)
}

after(teardown)
