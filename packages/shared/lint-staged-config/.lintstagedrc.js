const AllowExtensions = require('./src/allowExtensions')
const StagedCommands = require('./src/stagedCommands')

const extensions = new AllowExtensions()
  .add('typescript', '*.{ts, tsx}')
  .add('javascript', '*.js')
  .all()

const stagedCommands = new StagedCommands()
  .add('eslint --fix')
  .add('yarn test:staged')

const commands = [...stagedCommands]

module.exports = {
  [extensions.typescript]: commands
}

