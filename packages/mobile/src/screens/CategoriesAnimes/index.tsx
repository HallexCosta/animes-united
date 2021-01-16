import React, { useEffect, useState } from 'react'

import { api } from '@animes-united/axios-config'

import {
  Container,
  Main,
  Section,
  Head,
  Category,
  ViewMore,
  Article
} from './styles'

import animeThumbnail from '@assets/images/anime-thumbnail-default.jpg'

import { Anime, Header } from '@components'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type AnimeCategory = {
  category: string
  data: string[]
}

type AnimesCategoriesProps = {
  data: AnimeCategory[]
}

function Animes({ data }: AnimesCategoriesProps): JSX.Element {
  const navigation = useNavigation()

  function handleNavigateToCategoryAnimeScreen(currentCategory: string) {
    navigation.navigate('CategoryAnime', {
      category: currentCategory
    })
  }

  return (
    <>
      {data.map(animeCategory => {
        return (
          <Section key={animeCategory.category}>
            <Head>
              <Category># {animeCategory.category}</Category>
              <TouchableOpacity
                onPress={() =>
                  handleNavigateToCategoryAnimeScreen(animeCategory.category)
                }
              >
                <ViewMore>Ver mais</ViewMore>
              </TouchableOpacity>
            </Head>

            <Article horizontal={true}>
              {animeCategory.data.map(name => {
                return (
                  <Anime
                    key={name}
                    image={animeThumbnail}
                    title={name}
                    description="2018 - 24 eps"
                    style={styles.anime}
                  />
                )
              })}
            </Article>
          </Section>
        )
      })}
    </>
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
      <Header description="Categoria A - Z" />

      <Main>
        <Animes data={categoriesAnimes} />
      </Main>
    </Container>
  )
}
const styles = StyleSheet.create({
  anime: {
    marginRight: 15
  }
})
