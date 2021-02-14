const { createMetroConfiguration } = require('expo-yarn-workspaces')
const { getDefaultConfig } = require('metro-config')
const configuration = createMetroConfiguration(__dirname)

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig()

  return {
    ...configuration,
    transformer: {
      ...configuration.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
      ...configuration.resolver,
      assetExts: configuration.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  }
})()
