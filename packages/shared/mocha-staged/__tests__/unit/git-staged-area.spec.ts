/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { getGitStagedAreaFiles } from '../../src/git-staged-area'

describe('Git Staged Area', () => {
  it('Should be able to get git staged area files', () => {
    const expression = 'testing\\.spec\\.ts$'
    const expected = getGitStagedAreaFiles(expression)

    expect(expected[0]).to.be.equal(
      'packages/shared/mocha-staged/__tests__/unit/testing.spec.ts'
    )
  })

  it('Should be able to throw an error for not found spec files in git staged area', () => {
    const expression = 'same-testing-file\\.spec\\.ts$'
    const expectedToThrow = () => {
      getGitStagedAreaFiles(expression)
    }

    expect(expectedToThrow).to.be.throw
  })
})
