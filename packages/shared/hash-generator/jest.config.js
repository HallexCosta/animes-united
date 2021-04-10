const { ModuleMapper, config } = require('@animes-united/jest-config')
const tsconfig = require('./tsconfig')
const { name } = require('./package.json')

module.exports = {
  ...config.base,
  displayName: name,
  name,
  moduleNameMapper: ModuleMapper.pathsToModuleNameMapper(tsconfig)
}
