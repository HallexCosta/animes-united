import { mongodbURI } from '@common/configs/mongodb'
import { Anime } from '@entities'
import { AnimesRepository } from '@repositories'

import { animes as animesCategories } from './animes-by-category'
;(async function seed() {
  const repository = new AnimesRepository(mongodbURI)

  for (const { category, animes } of animesCategories) {
    for (const anime of animes) {
      const date = new Date()

      const entity = new Anime({
        ...anime,
        created_at: date,
        updated_at: date
      })

      await repository.category(category).save(entity)
    }
  }
})()
