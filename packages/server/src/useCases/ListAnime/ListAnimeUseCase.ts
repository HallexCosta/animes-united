import { ListAnimeRequestDTO } from './ListAnimeDTO'
import { Anime } from '@entities/Anime'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'
import { getFile, saveFile } from '@common/utils/file'

import path from 'path'
import { toUpperFirstCase } from '@common/utils/text'
import { getCurrentDate, getCurrentTime } from '@common/utils/date'

export class ListAnimeUseCase {
  constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(data: ListAnimeRequestDTO): Promise<Anime> {
    const anime = await this.yayanimesProvider.getAnime(data.name)

    if (!anime) {
      throw new Error(`Anime ${toUpperFirstCase(data.name)} not Found`)
    }

    const directoryAnimeSave = path.join(
      __dirname,
      '..',
      '..',
      'database',
      'json',
      'animes'
    )

    saveFile({
      filename: data.name.toLowerCase(),
      extension: 'json',
      directorySave: directoryAnimeSave,
      dataContent: anime
    })

    const directoryLogSave = path.join(__dirname, '..', '..')

    const currentDataContent = getFile({
      directorySource: directoryLogSave,
      filename: 'console',
      extension: 'log',
      createThisFileIfNotExists: true
    })

    const date = getCurrentDate()
    const time = getCurrentTime()

    const addNewContent = `[${date} ${time}] INFO  :...Anime ${toUpperFirstCase(
      data.name
    )} - Getting Successfully\n`

    saveFile({
      filename: 'console',
      extension: 'log',
      directorySave: directoryLogSave,
      dataContent: `${currentDataContent}\n${addNewContent}`
    })

    return anime
  }
}
