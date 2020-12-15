import { Logger } from '@common/system/Logger'
import { config } from '@common/configs/logger'

async function logger(): Promise<Logger> {
  const logger = new Logger(config)
  await logger.create()

  return logger
}

export { logger }
