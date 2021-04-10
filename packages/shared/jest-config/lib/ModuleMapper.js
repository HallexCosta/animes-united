const resolveJestPaths = require('tsconfig-paths-jest')

const ModuleMapper = {
  pathsToModuleNameMapper(tsconfig) {
    return resolveJestPaths(tsconfig)
  }
}

module.exports = ModuleMapper
