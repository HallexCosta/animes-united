const ModuleMapper = require('./ModuleMapper')
const monorepo = require('./jest-monorepo.config')
const base = require('./jest-base.config')

module.exports = {
  ModuleMapper,
  config: {
    monorepo,
    base
  }
}
