import { moveSpecFileOutsideToStageArea, deleteSpecFile } from './functions'

async function teardown() {
  const filepath = `${__dirname}/unit/testing.spec.ts`
  await moveSpecFileOutsideToStageArea(filepath)
  await deleteSpecFile(filepath)
}

after(teardown)
