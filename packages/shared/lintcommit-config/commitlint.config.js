const { join } = require('path')
const { readdirSync: readDirectory } = require('fs')
const DEFAULT_SCOPES = ['repo']

const packageDirNames = readDirectory(
  join(__dirname, '..', '..', '..', 'packages'),
  { withFileTypes: true }
)
  .filter(entry => entry.isDirectory())
  .map(dir => dir.name)

const scopes = DEFAULT_SCOPES.concat(packageDirNames)

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
