import { ListAnimeRequestDTO } from './ListAnimeDTO'
import { Anime } from '@entities/Anime'
import { IYayanimesProvider } from '@providers/IYayanimesProvider'
import { saveFile } from '@common/utils/file'

import path from 'path'
import { toUpperFirstCase } from '@common/utils/text'

export class ListAnimeUseCase {
  constructor(private yayanimesProvider: IYayanimesProvider) {}

  public async execute(data: ListAnimeRequestDTO): Promise<Anime> {
    const anime = await this.yayanimesProvider.getAnime(data.name)

    if (!anime) {
      throw new Error(`Anime ${toUpperFirstCase(data.name)} not Found`)
    }

    const directorySave = path.join(
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
      directorySave,
      dataContent: anime
    })

    return anime
  }
}
