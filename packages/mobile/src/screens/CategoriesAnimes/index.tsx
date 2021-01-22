import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Main,
  Section,
  Head,
  Category,
  ViewMore,
  Article
} from './styles'

import { api } from '@animes-united/axios-config'
import { Anime, AnimeProps, Header } from '@components'
import { CategoryAnimesResponse } from '@api/response'

export type AnimeCategoryComponentData = {
  category: string
  data: AnimeComponentData[]
}

export type AnimesCategoriesProps = {
  data: AnimeCategoryComponentData[]
}

export type AnimeComponentData = Omit<AnimeProps, 'style'>

function Animes({ data }: AnimesCategoriesProps): JSX.Element {
  const navigation = useNavigation()

  function handleNavigateToCategoryAnimeScreen(
    currentCategory: string,
    data: AnimeComponentData[]
  ) {
    navigation.navigate('CategoryAnimes', {
      category: currentCategory,
      data
    })
  }

  return (
    <>
      {data.map(animeCategoryComponent => {
        return (
          <Section key={animeCategoryComponent.category}>
            <Head>
              <Category># {animeCategoryComponent.category}</Category>
              <TouchableOpacity
                onPress={() =>
                  handleNavigateToCategoryAnimeScreen(
                    animeCategoryComponent.category,
                    animeCategoryComponent.data
                  )
                }
              >
                <ViewMore>Ver mais</ViewMore>
              </TouchableOpacity>
            </Head>

            <Article horizontal={true}>
              {animeCategoryComponent.data.map(
                ({ title, imageURL, description }, index) => {
                  return (
                    <Anime
                      key={index}
                      imageURL={imageURL}
                      title={title}
                      description={description}
                      style={styles.anime}
                    />
                  )
                }
              )}
            </Article>
          </Section>
        )
      })}
    </>
  )
}

export function CategoriesAnimes(): JSX.Element {
  const [categoriesAnimes, setCategoriesAnimes] = useState<
    CategoryAnimesResponse[]
  >([])

  function viewCategoriesAnimesDataComponent(
    data: CategoryAnimesResponse[]
  ): AnimeCategoryComponentData[] {
    const animeCategoryComponentData = data.map<AnimeCategoryComponentData>(
      categoryAnime => ({
        category: categoryAnime.category,
        data: categoryAnime.data.map<AnimeComponentData>(
          ({ name, yearRelease, imageURL, streamings }) => ({
            title: name,
            description: `${yearRelease} - ${
              streamings.episodes.length + streamings.ovas.length
            } eps`,
            imageURL
          })
        )
      })
    )

    return animeCategoryComponentData
  }

  useEffect(() => {
    api
      .get<CategoryAnimesResponse[]>('animes')
      .then(response => {
        const data = response.data

        setCategoriesAnimes(data)
      })
      .catch(e => console.log(e))
  }, [categoriesAnimes])

  return (
    <Container>
      <Header description="Categoria A - Z" />

      <Main>
        <Animes data={viewCategoriesAnimesDataComponent(categoriesAnimes)} />
      </Main>
    </Container>
  )
}

const styles = StyleSheet.create({
  anime: {
    marginRight: 15
  }
})
