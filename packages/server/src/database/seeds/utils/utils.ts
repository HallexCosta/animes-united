import { AnimeCategory } from '@repositories'

export function separateAnimesByCategory(animes: any[]): any[] {
  const namesByCategories: AnimeCategory[] = []

  for (const anime of animes) {
    const category: string = anime.name.match(/^[A-Z]/gi)
      ? anime.name[0].toUpperCase()
      : '1'

    const categoryFound = namesByCategories.find(
      namesByCategory => namesByCategory.category === category
    )

    if (categoryFound) {
      for (const namesByCategory of namesByCategories) {
        if (namesByCategory.category === category) {
          namesByCategory.animes.push({
            ...anime,
            name: anime.name
          })
          break
        }
      }
    } else {
      namesByCategories.push({
        category,
        animes: [
          {
            ...anime,
            name: anime.name
          }
        ]
      })
    }
  }

  return namesByCategories
}
