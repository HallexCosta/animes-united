import fs from 'fs'
import dirtyChai from 'dirty-chai'

import Utils from '@common/utils'
import { expect, use } from 'chai'
import { createSandbox, SinonSandbox } from 'sinon'

use(dirtyChai)

describe('@Utils', () => {
  describe('#createDirectory', async () => {
    let sandbox: SinonSandbox
    beforeEach(() => {
      sandbox = createSandbox()
    })
    afterEach(() => {
      sandbox.restore()
    })
    it('should created directory new directory if not exists', async () => {
      const directory = '~/fake/dir/test'
      const existsSyncStub = sandbox.stub(fs, 'existsSync').returns(false)
      const mkdirStub = sandbox.stub(fs.promises, 'mkdir')

      const created = await Utils.createDirectory(directory)

      expect(existsSyncStub.calledWith(directory)).to.be.true()
      expect(mkdirStub.calledOnce).to.be.true()
      expect(mkdirStub.calledWith(directory)).to.be.true()
      expect(created).to.be.true()
    })
    it('shouldn\'t create new directory and return false if exists', async () => {
      const directory = '~/fake/dir/test'
      const existsSyncStub = sandbox.stub(fs, 'existsSync').returns(true)
      const mkdirStub = sandbox.stub(fs.promises, 'mkdir')

      const created = await Utils.createDirectory(directory)

      expect(existsSyncStub.calledWith(directory)).to.be.true()
      expect(mkdirStub.calledOnce).to.be.false()
      expect(created).to.be.false()
    })
  })
  describe('#getValueFromArgs', () => {
    it('should be get one arg value of "process.argv"', () => {
      process.argv.push('-s', 'datas')

      const actual = Utils.getValueFromArgs('-s')
      expect(actual).to.be.equals('datas')
    })
    it('should return null if arg not found in "process.argv"', () => {
      const actual = Utils.getValueFromArgs('TEST')
      expect(actual).to.be.null()
    })
  })

  describe('#createAndSaveFile', () => {
    let sandbox: SinonSandbox
    beforeEach(() => {
      sandbox = createSandbox()
    })
    afterEach(() => {
      sandbox.restore()
    })
    it('should create file with content', async () => {
      const pathName = ''
      const content = ''
      const writeFileStub = sandbox.stub(fs.promises, 'writeFile')
      const created = await Utils.createAndSaveFile(pathName, content)

      expect(writeFileStub.calledOnce).to.be.true()
      expect(created).to.be.true()
    })
  })
})
