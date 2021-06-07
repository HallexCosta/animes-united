const { ModuleMapper, config } = require('@animes-united/jest-config')
const tsconfig = require('./tsconfig.json')
const { name } = require('./package.json')

module.exports = {
  ...config.base,
  displayName: name,
  name,
  moduleNameMapper: ModuleMapper.pathsToModuleNameMapper(tsconfig),
  globalTeardown: '<rootDir>/jest.teardown.js',
  preset: 'ts-jest'
}
