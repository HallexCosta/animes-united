const tsconfig = require('./tsconfig.json')
const { name } = require('./package.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  displayName: name,
  name,
  moduleNameMapper
}
