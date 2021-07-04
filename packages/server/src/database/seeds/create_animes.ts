import { mongodbURI } from '@common/configs/mongodb'
import { Anime } from '@entities'
import { AnimeRepository } from '@repositories'

import { animes as animesCategories } from './animes-by-category'
;(async function seed() {
  const repository = new AnimeRepository(mongodbURI)

  for (const { category, data: animes } of animesCategories) {
    for (const anime of animes) {
      const date = new Date()

      const entity = new Anime({
        ...anime,
        createdAt: date,
        updatedAt: date
      })

      await repository.category(category).save(entity)
    }
  }
})()
