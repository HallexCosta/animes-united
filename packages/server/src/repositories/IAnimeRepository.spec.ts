import { Streamings } from '@entities/Anime'
import { ObjectId } from 'mongodb'
import { IAnimeRepository } from './IAnimeRepository'
import { CategoryAnime } from './implementations/AnimeRepository'

const mockAnimeRepository: jest.Mocked<IAnimeRepository> = {
  findAll: jest.fn(),
  category: jest.fn(),
  deleteByName: jest.fn(),
  findByCategory: jest.fn(),
  findByName: jest.fn(),
  save: jest.fn()
}

const anime = {
  name: 'Charlotte',
  imageURL: 'https://yayanimes.net/CapasAnimes/C/Charlotte.jpg',
  studio: 'P.A Works',
  genre: 'Drama, Escolar, Superpoderes',
  status: 'Completo',
  yearRelease: 2015,
  rating: 9.4,
  sinopse:
    'A história gira em torno de habilidades especiais que ocorrem entre um pequeno percentual de meninos e meninas na puberdade. Yuu Otosaka usa seu poder sem os outros saberem, e vive uma vida escolar bastante normal. Perante ele, de repente, aparece uma menina, Nao Tomori. Devido ao seu encontro com ela, o destino dos usuários de poderes especiais será exposto.',
  streamings: {
    episodes: [
      {
        title: 'Charlotte – Episódio 01',
        number: 1,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte01.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-1/'
      },
      {
        title: 'Charlotte – Episódio 02',
        number: 2,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte02.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-2/'
      },
      {
        title: 'Charlotte – Episódio 03',
        number: 3,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte03.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-3/'
      },
      {
        title: 'Charlotte – Episódio 04',
        number: 4,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte04.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-4/'
      },
      {
        title: 'Charlotte – Episódio 05',
        number: 5,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte05.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-5/'
      },
      {
        title: 'Charlotte – Episódio 06',
        number: 6,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte06.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-6/'
      },
      {
        title: 'Charlotte – Episódio 07',
        number: 7,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte07.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-7/'
      },
      {
        title: 'Charlotte – Episódio 08',
        number: 8,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte08.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-8/'
      },
      {
        title: 'Charlotte – Episódio 09',
        number: 9,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte09.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-9/'
      },
      {
        title: 'Charlotte – Episódio 10',
        number: 10,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte10.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-10/'
      },
      {
        title: 'Charlotte – Episódio 11',
        number: 11,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte11.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-11/'
      },
      {
        title: 'Charlotte – Episódio 12',
        number: 12,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte12.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-12/'
      },
      {
        title: 'Charlotte – Episódio 13',
        number: 13,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte13.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-episodio-13/'
      }
    ],
    ovas: [
      {
        title: 'Charlotte – OVA 01',
        number: 1,
        thumbnail:
          'https://yayanimes.net/Miniaturas/2015/Charlotte/CharlotteOVA.jpg',
        qualityStreaming: 'HD',
        url: 'https://yayanimes.net/charlotte-ova-1/'
      }
    ]
  }
}
const categoriesAnimes: CategoryAnime[] = [
  {
    category: 'A',
    data: [
      {
        _id: new ObjectId(),
        name: 'Akami Ga Kill!',
        imageURL: 'http://yayanimes.net/Capa-AkamiGaKill.jpg',
        genre: '',
        rating: 5,
        sinopse: 'Something sinopse',
        status: 'Completo',
        yearRelease: 2015,
        studio: "P.A Studio's",
        streamings: {
          ovas: [],
          episodes: []
        }
      }
    ]
  },
  {
    category: 'C',
    data: [
      {
        ...anime,
        _id: new ObjectId()
      }
    ]
  }
]
mockAnimeRepository.findAll.mockResolvedValueOnce(categoriesAnimes)
mockAnimeRepository.category.mockReturnThis()

describe('Test Anime Repository contract', () => {
  it('Should be able to find all categories animes', async done => {
    const expected = await mockAnimeRepository.findAll()

    expect(mockAnimeRepository.findAll).toHaveBeenCalledTimes(1)
    expect(expected).resolves.toReturnWith(categoriesAnimes)
    expect(expected[0]).toHaveProperty('category')
    expect(expected[0]).toHaveProperty('data')
    expect(expected[0].data[0]).toHaveProperty('_id')
    expect(expected.length).toEqual(2)
    done()
  })

  it('Should be able to category method return instance this class', () => {
    const expected = mockAnimeRepository.category('')

    expect(expected).toHaveProperty(['findAll'])
  })
})
