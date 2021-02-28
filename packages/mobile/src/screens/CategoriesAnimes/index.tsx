import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
  View,
  Text,
  Button
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Container, Head, Category, ViewMore } from './styles'

import { api } from '@animes-united/axios-config'
import { Anime as AnimeItem, Header } from '@components'
import { AnimeResponse, CategoryAnimesResponse } from '@api/response'
import {
  FlatList as Article,
  FlatList as Section
} from 'react-native-gesture-handler'

export type AnimesProps = {
  data: AnimeResponse[]
}

export type CategoriesAnimesProps = {
  data: CategoryAnimesResponse[]
}

function Animes({ data }: AnimesProps) {
  const renderItem = ({
    item: {
      name: title,
      imageURL: url,
      yearRelease: year,
      streamings: { episodes, ovas }
    }
  }: ListRenderItemInfo<AnimeResponse>) => (
    <AnimeItem
      imageURL={url}
      title={title}
      description={`${year} - ${episodes.length + ovas.length} eps`}
      style={styles.anime}
    />
  )

  return (
    <Article
      style={styles.article}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={5}
      initialNumToRender={3}
    />
  )
}

function CategoriesAnimes({ data }: CategoriesAnimesProps): JSX.Element {
  const navigation = useNavigation()

  function handleNavigateToCategoryAnimeScreen(
    category: string,
    data: AnimeResponse[]
  ) {
    navigation.navigate('CategoryAnimes', {
      category,
      data
    })
  }

  const renderItem = ({
    item: { category, data }
  }: ListRenderItemInfo<CategoryAnimesResponse>) => (
    <>
      <Head>
        <Category># {category}</Category>
        <TouchableOpacity
          onPress={() => handleNavigateToCategoryAnimeScreen(category, data)}
        >
          <ViewMore>Ver mais</ViewMore>
        </TouchableOpacity>
      </Head>

      <Animes data={data} />
    </>
  )

  return (
    <Section
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.category}
    />
  )
}

export function CategoriesAnimesScreen(): JSX.Element {
  const [categoriesAnimes, setCategoriesAnimes] = useState<
    CategoryAnimesResponse[]
  >([])

  useEffect(() => {
    api
      .get<CategoryAnimesResponse[]>('animes')
      .then(response => {
        const { data } = response
        setCategoriesAnimes(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <Container>
      <Header description="Categoria A - Z" style={{ marginTop: 16 }} />

      <CategoriesAnimes data={categoriesAnimes} />
    </Container>
  )
}

const styles = StyleSheet.create({
  anime: {
    marginRight: 15
  },
  article: {
    height: 205,
    marginTop: 5,
    flexDirection: 'row'
  },
  section: {
    marginBottom: 16
  }
})
