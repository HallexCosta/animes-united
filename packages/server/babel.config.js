module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@adapters': './src/adapters',
          '@useCases': './src/useCases',
          '@entities': './src/entities',
          '@repositories': './src/repositories',
          '@providers': './src/providers',
          '@common': './src/common',
          '@errors': './src/errors'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
