const Hooks = require('./hooks')

const hooks = new Hooks()
    .add('pre-commit', ['lint-staged'])
    .add('commit-msg', ['commitlint -E HUSKY_GIT_PARAMS'])
    .toObject()

module.exports = {
    hooks
}