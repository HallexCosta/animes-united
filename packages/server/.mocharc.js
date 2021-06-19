module.exports = {
  diff: true,
  color: true,
  extension: ['ts'],
  package: './package.json',
  reporter: 'landing',
  require: ['ts-node/register', 'tsconfig-paths/register'],
  timeout: 0,
  spec: ['__tests__/unit/**/*.spec.ts'],
  ui: 'bdd',
  watchFiles: ['__tests__']
}
