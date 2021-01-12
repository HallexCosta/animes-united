import React, { useEffect, useState } from 'react'

import { api } from '@animes-united/axios-config'

import {
  Container,
  Header,
  GoBackScreen,
  Info,
  Main,
  Section,
  Head,
  Category,
  ViewMore,
  Article
} from './styles'

import animeThumbnail from '@assets/images/anime-thumbnail-default.jpg'
import iconArrowLeft from '@assets/icons/arrow-left.png'

import { Anime } from '@components'

type AnimeCategory = {
  category: string
  data: string[]
}

type AnimesCategoriesProps = {
  data: AnimeCategory[]
}

function Animes({ data }: AnimesCategoriesProps): JSX.Element {
  return (
    <Main>
      {data.map(animeCategory => {
        return (
          <Section key={animeCategory.category}>
            <Head>
              <Category># {animeCategory.category}</Category>
              <ViewMore>Ver mais</ViewMore>
            </Head>

            <Article horizontal={true}>
              {animeCategory.data.map(name => {
                return (
                  <Anime
                    key={name}
                    image={animeThumbnail}
                    title={name}
                    description="2018 - 24 eps"
                  />
                )
              })}
            </Article>
          </Section>
        )
      })}
    </Main>
  )
}

export function CategoriesAnimes(): JSX.Element {
  const [categoriesAnimes, setCategoriesAnimes] = useState<AnimeCategory[]>([])

  useEffect(() => {
    api
      .get<AnimeCategory[]>('animes')
      .then(response => {
        const data = response.data

        setCategoriesAnimes(data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <Container>
      <Header>
        <GoBackScreen source={iconArrowLeft} />

        <Info>Categoria A - Z</Info>
      </Header>

      <Animes data={categoriesAnimes} />
    </Container>
  )
}
