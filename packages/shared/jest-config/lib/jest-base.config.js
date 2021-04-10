/* eslint no-useless-escape: "off" */
// prettier-ignore

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  transform: {
    '.(ts)': '@sucrase/jest-plugin'
  }
}
