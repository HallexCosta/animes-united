module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@presentation/atoms': './src/presentation/atoms',
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './src/assets',
            '@api': './src/api',
            '@util': './src/util',
            '@routes': './src/routes'
          }
        }
      ]
    ]
  }
}
