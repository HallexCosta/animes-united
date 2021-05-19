import { api } from '@animes-united/axios-config'
import { AnimeResponse, CategoryAnimesResponse } from '@api/response'
import { Anime as AnimeItem, Header } from '@components'

import React, { memo, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ListRenderItemInfo, StyleSheet, TouchableOpacity } from 'react-native'
import {
  FlatList as Article,
  FlatList as Section
} from 'react-native-gesture-handler'

import {
  Category,
  Container,
  SectionItem,
  Head,
  Main,
  ViewMore
} from './styles'

export type AnimesProps = {
  data: AnimeResponse[]
}

export type CategoriesAnimesProps = {
  data: CategoryAnimesResponse[]
}

const Animes = memo(function Animes({ data }: AnimesProps) {
  const renderItem = ({ item }: ListRenderItemInfo<AnimeResponse>) => (
    <AnimeItem data={item} style={styles.anime} />
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
})

const CategoriesAnimes = memo(function CategoriesAnimes({
  data
}: CategoriesAnimesProps): JSX.Element {
  const navigation = useNavigation()

  function handleNavigateToCategoryAnime(
    category: string,
    data: AnimeResponse[]
  ) {
    navigation.navigate('AnimesCategory', {
      category,
      data
    })
  }

  const renderItem = ({
    item: { category, data }
  }: ListRenderItemInfo<CategoryAnimesResponse>) => (
    <SectionItem>
      <Head>
        <Category># {category}</Category>
        <TouchableOpacity
          onPress={handleNavigateToCategoryAnime.bind(
            null,
            category,
            data
          )}
        >
          <ViewMore>Ver mais</ViewMore>
        </TouchableOpacity>
      </Head>

      <Animes data={data} />
    </SectionItem>
  )

  return (
    <Main>
      <Section
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.category}
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        updateCellsBatchingPeriod={30}
      />
    </Main>
  )
})

export function AnimesCategories(): JSX.Element {
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
  }
})
