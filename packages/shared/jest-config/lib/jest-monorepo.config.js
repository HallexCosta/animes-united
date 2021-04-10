/* eslint no-useless-escape: "off" */
// prettier-ignore

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testEnvironment: 'node',
  testRegex: ['packages\/(shared\/)?(.*\/)__tests__\/\w+.spec.ts'],
  transform: {
    '.(ts)': '@sucrase/jest-plugin'
  }
}
