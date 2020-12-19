import path from 'path'

import { ListAnimeRequestDTO } from './ListAnimeDTO'
import { Anime } from '@entities/Anime'

import { IYayanimesProvider } from '@providers/IYayanimesProvider'

import { ILogger } from '@common/system/Logger/ILogger'

import { saveFile } from '@common/utils/file'
import { toUpperFirstCase } from '@common/utils/text'
import { getCurrentDate, getCurrentTime } from '@common/utils/date'
export class ListAnimeUseCase {
  constructor(
    private yayanimesProvider: IYayanimesProvider,
    private monitor: ILogger
  ) {}

  public async execute(data: ListAnimeRequestDTO): Promise<Anime> {
    const anime = await this.yayanimesProvider.getAnime(data.name)

    if (!anime) {
      throw new Error(`Anime ${toUpperFirstCase(data.name)} not Found`)
    }

    const directoryAnimeSave = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'database',
      'json',
      'animes'
    )

    saveFile({
      filename: data.name.toLowerCase(),
      extension: 'js',
      directorySave: directoryAnimeSave,
      dataContent: anime
    })

    const date = getCurrentDate()
    const time = getCurrentTime()

    const log = `[${date} ${time}] INFO  :...Anime ${toUpperFirstCase(
      data.name
    )} - Getting Successfully`

    await this.monitor.write(log)

    return anime
  }
}
