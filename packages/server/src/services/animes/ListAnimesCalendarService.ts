import { mongodbURI } from '@common/configs/mongodb'

import { Anime } from '@entities/Anime'

import AnimesRepository, {
  AnimeCategory,
  AnimesRepositoryMethods
} from '@repositories/AnimesRepository'

export class ListAnimesCalendarService {
  private readonly repository: AnimesRepositoryMethods
  private readonly calendar: string[]

  constructor() {
    this.repository = new AnimesRepository(mongodbURI)
    this.calendar = [
      'Darling in the FranXX',
      'Violet Evergarden',
      'Charlotte',
      'Akame ga Kill!',
      'Re:Creators',
      'Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai',
      'Mirai Nikki',
      'Jujutsu Kaisen',
      'Yahari Ore no Seishun Love Comedy wa Machigatteiru. Zoku',
      'Mushoku Tensei: Isekai Ittara Honki Dasu',
      'Magi: The Kingdom of Magic',
      'Bakemonogatari',
      'Re:Zero kara Hajimeru Isekai Seikatsu',
      'Kono Subarashii Sekai ni Shukufuku wo!: Kurenai Densetsu',
      'A.I.C.O.: Incarnation',
      'Kono Subarashii Sekai ni Shukufuku wo! 2',
      'Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen',
      'Shigatsu wa Kimi no Uso',
      'Gotoubun no Hanayome',
      'Eromanga-sensei',
      'Busou Shoujo Machiavellianism',
      'Ijiranaide, Nagatoro-san',
      'Sword Art Online'
    ]
  }

  private bringFromCalendar(animes: Anime[], calendar: string[]): Anime[] {
    return animes.filter(anime => calendar.includes(anime.name))
  }

  private merge(categories: AnimeCategory[]): Anime[] {
    const animes: Anime[] = []

    for (const category of categories) {
      animes.push(...category.animes)
    }

    return animes
  }

  public async execute(): Promise<Anime[]> {
    const animes = await this.repository.findAll()

    return this.bringFromCalendar(this.merge(animes), this.calendar)
  }
}
