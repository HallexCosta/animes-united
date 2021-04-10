const { deepStrictEqual, throws } = require('assert')
const ModuleMapper = require('./ModuleMapper')
const monorepo = require('./jest-monorepo.config')
const base = require('./jest-base.config')

{
  // ModuleMapper
  const tsconfig = {
    compilerOptions: {
      paths: {
        '@src/*': ['./src']
      }
    }
  }
  const expected = {
    '@src/(.*)': '<rootDir>/./src'
  }

  deepStrictEqual(ModuleMapper.pathsToModuleNameMapper(tsconfig), expected)

  // Should be able throw error if has property 'paths'
  delete tsconfig.compilerOptions.paths
  throws(() => ModuleMapper.pathsToModuleNameMapper(tsconfig), {
    name: 'TypeError',
    message: 'Cannot convert undefined or null to object'
  })

  // Should be able throw error if has property 'compilerOptions'
  delete tsconfig.compilerOptions
  throws(() => ModuleMapper.pathsToModuleNameMapper(tsconfig), {
    name: 'TypeError',
    message: "Cannot read property 'paths' of undefined"
  })
}

{
  // monorepo config
  const actual = monorepo
  deepStrictEqual(typeof actual, 'object')
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'projects'),
    true
  )
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'testEnvironment'),
    true
  )
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'testRegex'),
    true
  )
}

{
  // base config
  const actual = base
  deepStrictEqual(typeof actual, 'object')
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'testMatch'),
    true
  )
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'transform'),
    true
  )
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'testPathIgnorePatterns'),
    true
  )
  deepStrictEqual(
    Object.prototype.hasOwnProperty.call(actual, 'transformIgnorePatterns'),
    true
  )
}
