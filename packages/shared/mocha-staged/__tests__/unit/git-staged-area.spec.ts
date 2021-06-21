/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import {
  SimpleStageFile,
  StageFile,
  getGitStagedAreaFiles,
  separateByScope,
  runTests
} from '../../src/git-staged-area'

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

  it('Should be able to separate SimpleStageFile and merge files with the same scope', () => {
    const simpleStageFiles: SimpleStageFile[] = [
      {
        scope: 'mocha-staged',
        file: '__tests__/unit/testing.spec.ts'
      },
      {
        scope: 'mocha-staged',
        file: '__tests__/unit/testing2.spec.ts'
      }
    ]

    const expected = separateByScope(simpleStageFiles)
    expect(expected[0].scope).to.be.equal('mocha-staged')
    expect(expected[0].files[0]).to.be.equal('__tests__/unit/testing.spec.ts')
    expect(expected[0].files[1]).to.be.equal('__tests__/unit/testing2.spec.ts')
  })

  it('Should be able to separate SimpleStageFile and merge files with the different scopes', () => {
    const simpleStageFiles: SimpleStageFile[] = [
      {
        scope: 'server',
        file: '__tests__/unit/testing.spec.ts'
      },
      {
        scope: 'mocha-staged',
        file: '__tests__/unit/testing.spec.ts'
      }
    ]

    const expected = separateByScope(simpleStageFiles)
    console.log(expected)

    expect(expected[0].scope).to.be.equal('server')
    expect(expected[0].files[0]).to.be.equal('__tests__/unit/testing.spec.ts')
    expect(expected[1].scope).to.be.equal('mocha-staged')
    expect(expected[1].files[0]).to.be.equal('__tests__/unit/testing.spec.ts')
  })

  it('Should be able to all spec files for each scope', () => {
    const stageFiles: StageFile[] = [
      {
        scope: 'server',
        files: [
          '__tests__/unit/testing.spec.ts',
          '__tests__/unit/testing2.spec.ts'
        ]
      }
    ]

    const success = runTests(stageFiles)
    expect(success).to.be.true
  })
})
