import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Main,
  /* Section, */ Head,
  Category,
  ViewMore
} from './styles'

import { api } from '@animes-united/axios-config'
import { Anime as AnimeItem, Header } from '@components'
import {
  AnimeResponse,
  CategoryAnimesResponse,
  EpisodeResponse
} from '@api/response'
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

function renderAnime({
  item: {
    name: title,
    imageURL: url,
    yearRelease: year,
    streamings: { episodes, ovas }
  }
}: ListRenderItemInfo<AnimeResponse>): JSX.Element {
  return (
    <AnimeItem
      imageURL={url}
      title={title}
      description={`${year} - ${episodes.length + ovas.length} eps`}
      style={styles.anime}
    />
  )
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
      maxToRenderPerBatch={3}
      initialNumToRender={2}
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
    <>
      <Section
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.category}
      />
    </>
  )
}

export function CategoriesAnimesScreen(): JSX.Element {
  const [categoriesAnimes, setCategoriesAnimes] = useState<
    CategoryAnimesResponse[]
  >([])

  useEffect(() => {
    const data = {
      _id: Math.random().toString(),
      name: 'Darling in the franxx',
      yearRelease: 2014,
      imageURL:
        'http://static.tvmaze.com/uploads/images/original_untouched/138/346431.jpg',
      streamings: {
        ovas: [
          {
            title: 'Testing',
            url: 'sadasd',
            number: 0,
            thumbnail: 'thumbnail',
            qualityStreaming: 'HD'
          }
        ],
        episodes: [
          {
            title: 'Testing',
            url: 'sadasd',
            number: 0,
            thumbnail: 'thumbnail',
            qualityStreaming: 'HD'
          }
        ]
      }
    } as AnimeResponse

    const animes: CategoryAnimesResponse[] = [
      {
        category: 'A',
        data: [data, data, data, data, data]
      },
      {
        category: 'B',
        data: [data, data, data, data, data]
      }
    ]

    setCategoriesAnimes(animes)
  }, [])

  return (
    <Container>
      <Header description="Categoria A - Z" style={{ marginTop: 16 }} />

      <Main>
        <CategoriesAnimes data={categoriesAnimes} />
      </Main>
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
