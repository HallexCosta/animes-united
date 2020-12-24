module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
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
