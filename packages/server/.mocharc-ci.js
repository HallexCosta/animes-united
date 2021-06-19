module.exports = {
  diff: true,
  color: true,
  extension: ['ts'],
  package: './package.json',
  reporter: 'spec',
  require: ['ts-node/register', 'tsconfig-paths/register'],
  timeout: 0,
  spec: ['__tests__/unit/**/*.spec.ts'],
  ui: 'bdd'
}
