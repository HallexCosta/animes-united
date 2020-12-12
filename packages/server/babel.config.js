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
          '@http': './src/http'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
