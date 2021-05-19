import React, { useEffect, useState } from 'react'

import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { AppLoading } from 'expo'

import { ScreenProps } from 'src/routes'
import { Header, Anime } from '@components'

import { AnimeResponse } from '@api/response'

import { NoFound } from '@presentation/atoms'

import {
  Container,
  Main,
  Section,
  SearchInput,
  SearchIcon,
  Article
} from './styles'

import searchIcon from '@assets/icons/search.png'

export function AnimesCategory({
  route
}: ScreenProps<'AnimesCategory'>): JSX.Element {
  const [loaded, setLoaded] = useState(false)
  const [category, setCategory] = useState<string>('')
  const [data, setData] = useState<AnimeResponse[]>([])
  const [filteredData, setFilteredData] = useState<AnimeResponse[]>([])

  const [searchText, setSearchText] = useState('')
  const [delay] = useState(500)
  const [timerId, setTimerId] = useState<NodeJS.Timeout>(
    setTimeout(() => {
      // do nothing.
    }, 0)
  )

  function updateAnimesList() {
    const newFilteredData = data.filter(
      anime => anime.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    )

    setFilteredData(newFilteredData)
  }

  function handleSearchText(text: string) {
    if (text === '') {
      setFilteredData(data)
    }

    setSearchText(text)
  }

  function updateAnimesOnSearch() {
    setTimerId(setTimeout(updateAnimesList, delay))
    clearTimeout(timerId)
  }

  function onSearch(text: string) {
    handleSearchText(text)
    updateAnimesOnSearch()
  }

  const renderItem = ({ item: data }: ListRenderItemInfo<AnimeResponse>) => (
    <Anime data={data} style={styles.anime} />
  )

  useEffect(() => {
    setCategory(route.params.category)
    setData(route.params.data)
    setFilteredData(route.params.data)
    setLoaded(true)
  }, [route.params])

  return loaded ? (
    <Container>
      <Header description={`Categoria ${category}`} />

      <Main>
        <Section>
          <SearchInput
            placeholder="Filtre os animes"
            placeholderTextColor="#00000040"
            onChangeText={onSearch.bind(null)}
            value={searchText}
          />

          <TouchableOpacity onPress={updateAnimesList.bind(null, searchText)}>
            <SearchIcon source={searchIcon} />
          </TouchableOpacity>
        </Section>

        <Article>
          {filteredData.length > 0 ? (
            <FlatList
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={filteredData}
              maxToRenderPerBatch={6}
              initialNumToRender={6}
              updateCellsBatchingPeriod={30}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          ) : (
            <NoFound />
          )}
        </Article>
      </Main>
    </Container>
  ) : (
    <AppLoading />
  )
}

const styles = StyleSheet.create({
  anime: {
    marginRight: 20,
    marginBottom: 15
  }
})
