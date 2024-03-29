module.exports = {
  'allow-uncaught': false,
  diff: true,
  color: true,
  exit: true,
  bail: true,
  extension: ['ts'],
  package: './package.json',
  reporter: 'spec',
  require: ['dotenv/config', 'ts-node/register', 'tsconfig-paths/register'],
  timeout: 0,
  ui: 'bdd',
  spec: ['__tests__/unit/**/*.spec.ts'],
}
