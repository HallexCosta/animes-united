declare module '@design-patterns-typescript/jest-config' {
  declare interface ModuleMapper {
    pathsToModuleNameMapper(
      tsconfig: unknown
    ): {
      [k: string]: string
    }
  }
  declare const config: {
    base: {
      testPathIgnorePatterns?: string[]
      transformIgnorePatterns?: string[]
      testMatch?: string[]
      testRegex?: string[]
      transform?: {
        [k: string]: string
      }
    }
    monorepo: {
      clearMocks?: boolean
      preset?: string
      projects?: string[]
      testEnvironment?: string
      testRegex?: string[]
    }
  }
}
