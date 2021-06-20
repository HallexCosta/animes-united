import { unlink } from 'fs/promises'

async function deleteSpecFile(filepath: string) {
  try {
    await unlink(filepath)
  } catch (e) {
    console.log(e)
  }
}

async function teardown() {
  const filepath = `${__dirname}/unit/testing.spec.ts`
  await deleteSpecFile(filepath)
  console.log('Finish Teardown')
}

after(teardown)
