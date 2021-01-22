import path from 'path'

import { ListAnimeRequestDTO } from './ListAnimeDTO'
import { Anime } from '@entities/Anime'

import { IYayanimesProvider } from '@providers/IYayanimesProvider'

import { ILogger } from '@common/system/Logger/ILogger'

import { saveFile } from '@common/utils/file'
import { toUpperFirstCase } from '@common/utils/text'
import { getCurrentDate, getCurrentTime } from '@common/utils/date'

import { AnimeRepository } from '@repositories/implementations/AnimeRepository'

export class ListAnimeUseCase {
  constructor(
    private animeRepository: AnimeRepository,
    private yayanimesProvider: IYayanimesProvider,
    private monitor: ILogger
  ) {}

  private async saveOnDatabase(anime: Anime): Promise<boolean> {
    const { name } = anime

    const animeAlreadyExists = await this.animeRepository.findByName(name)

    if (!animeAlreadyExists) {
      return await this.animeRepository.category(name[0]).save(anime)
    }

    return false
  }

  public async execute(data: ListAnimeRequestDTO): Promise<Anime> {
    const animeAlreadyExists = await this.animeRepository.findByName(data.name)

    if (animeAlreadyExists) {
      return new Anime(animeAlreadyExists, animeAlreadyExists._id)
    }

    const animeData = await this.yayanimesProvider.getAnime(data.name)

    if (!animeData) {
      throw new Error(`Anime ${toUpperFirstCase(data.name)} not Found`)
    }

    const anime = new Anime(animeData)

    const saved = await this.saveOnDatabase(anime)
    console.log('saveOnDatabase', saved)

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
