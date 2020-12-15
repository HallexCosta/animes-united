import { join } from 'path'

import { LoggerFileConfig } from '@common/system/Logger'

export const config: LoggerFileConfig = {
  filename: 'console',
  extension: 'log',
  directorySource: join(__dirname, '..', '..')
}
