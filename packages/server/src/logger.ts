import { Logger } from '@common/system/Logger'
import { ILogger } from '@common/system/Logger/ILogger'
import { config } from '@common/configs/logger'

async function logger(): Promise<ILogger> {
  const logger = new Logger(config)
  await logger.create()

  return logger
}

export { logger }
