const { join } = require('path')
const { readdirSync: readDirectory } = require('fs')
const DEFAULT_SCOPES = ['global']

const packageDirNames = readDirectory(
  join(__dirname, '..', '..', '..', 'packages'),
  { withFileTypes: true }
)
  .filter(entry => entry.isDirectory())
  .map(dir => (dir.name === 'shared' ? null : dir.name))
  .filter(name => name != null)

const packagesSharedDirNames = readDirectory(
  join(__dirname, '..', '..', '..', 'packages', 'shared'),
  { withFileTypes: true }
)
  .filter(entry => entry.isDirectory())
  .map(dir => dir.name)

const allPackagesDIrNames = packageDirNames.concat(packagesSharedDirNames)

const scopes = DEFAULT_SCOPES.concat(allPackagesDIrNames)

module.exports = {
  extends: ['monorepo'],
  rules: {
    'scope-enum': [
      2, // throw error
      'always',
      scopes
    ]
  }
}
