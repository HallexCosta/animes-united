import { YayanimesProvider } from '@providers/implementations/YayanimesProvider'

export function factoryYayanimesProvider(): YayanimesProvider {
  return new YayanimesProvider()
}
