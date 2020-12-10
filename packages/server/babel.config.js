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
          '@commons': './src/commons'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
