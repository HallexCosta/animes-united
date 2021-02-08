import { Anime } from './Anime'
import { Episode } from './Episode'
import { Streamings } from './Streamings'

function factoryAnime() {
  const data = new Anime({
    name: 'Charlotte',
    imageURL: 'https://yayanimes.net/CapasAnimes/C/Charlotte.jpg',
    studio: 'P.A Works',
    genre: 'Drama, Escolar, Superpoderes',
    status: 'Completo',
    yearRelease: 2015,
    rating: 9.6,
    synopsis:
      'A história gira em torno de habilidades especiais que ocorrem entre um pequeno percentual de meninos e meninas na puberdade. Yuu Otosaka usa seu poder sem os outros saberem, e vive uma vida escolar bastante normal. Perante ele, de repente, aparece uma menina, Nao Tomori. Devido ao seu encontro com ela, o destino dos usuários de poderes especiais será exposto.',
    streamings: new Streamings({
      episodes: [
        new Episode({
          title: 'Charlotte – Episódio 01',
          number: 1,
          thumbnail:
            'https://yayanimes.net/Miniaturas/2015/Charlotte/Charlotte01.jpg',
          qualityStreaming: 'HD',
          url: 'https://yayanimes.net/charlotte-episodio-1/'
        })
      ],
      ovas: [
        new Episode({
          title: 'Charlotte – OVA 01',
          number: 1,
          thumbnail:
            'https://yayanimes.net/Miniaturas/2015/Charlotte/CharlotteOVA.jpg',
          qualityStreaming: 'HD',
          url: 'https://yayanimes.net/charlotte-ova-1/'
        })
      ]
    })
  })

  return {
    data: data,
    instance: new Anime(data)
  }
}

describe('Entity Anime', () => {
  beforeAll(() => {
    const { instance } = factoryAnime()

    expect(instance).toBeInstanceOf(Anime)
  })

  it('Must be able to generate a unique id for Entity Anime class with length of 24 chars', () => {
    const { instance } = factoryAnime()

    expect(instance).toHaveProperty('_id')
    expect(instance._id.toHexString()).toHaveLength(24)
  })

  it('Must have a unique id for each Entity Anime Episode class with length of 24 chars', () => {
    const { instance } = factoryAnime()

    expect(instance.streamings.episodes[0]).toHaveProperty('id')
    expect(instance.streamings.episodes[0].id).toHaveLength(24)
  })
})
