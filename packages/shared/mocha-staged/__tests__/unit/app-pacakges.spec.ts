/* eslint no-unused-expressions: "off" */
import { expect } from 'chai'
import {
  preapareStagedFiles,
  checkForIsAppPackage,
  checkForIsSharedPackage,
  getAppPackages,
  getSharedPackages,
  mergePacakges
} from '@src'

describe('App Packages', () => {
  const sharedSpecFile =
    'packages/shared/mocha-staged/__tests__/unit/testing.spec.ts'
  const appSpecFile = 'packages/server/__tests__/unit/testing.spec.ts'

  it('Should be able to get all app packages', () => {
    const expected = getAppPackages()

    expect(expected.length > 0).to.be.true
  })

  it('Should be able to get all shared packages', () => {
    const expected = getSharedPackages()

    expect(expected.length > 0).to.be.true
  })

  it('Should be able to merge app with shared packages and returns all packages', () => {
    const appPackages = getAppPackages()
    const sharedPackages = getSharedPackages()
    const expected = mergePacakges({
      appPackages,
      sharedPackages
    })
    expect(expected.length).to.be.equal(
      appPackages.length + sharedPackages.length
    )
  })

  it('Should be able to check for is app packages.', () => {
    const expected = checkForIsAppPackage(appSpecFile)

    expect(expected).to.be.true
  })

  it('Should be able to check for is shared packages.', () => {
    const expected = checkForIsSharedPackage(sharedSpecFile)

    expect(expected).to.be.true
  })

  it('Should be able to an app or shared package and return SimpleStageFile.', () => {
    const expected = preapareStagedFiles(sharedSpecFile)

    expect(expected.scope).to.be.equal('mocha-staged')
    expect(expected.file).to.be.equal('__tests__/unit/testing.spec.ts')
  })

  it('Should be able to throw an error for not is an app or shared package.', () => {
    const specFile = 'no-is-a-package/__tests__/unit/testing.spec.ts'
    const expectedToThrow = () => {
      preapareStagedFiles(specFile)
    }

    expect(expectedToThrow).to.throw
  })
})
