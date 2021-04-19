import React, { useEffect, useState } from 'react'

import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

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

export function CategoryAnimes({
  route
}: ScreenProps<'CategoryAnimes'>): JSX.Element {
  const [category, setCategory] = useState<string>('')
  const [data, setData] = useState<AnimeResponse[]>([])
  const [filteredData, setFilteredData] = useState<AnimeResponse[]>([])

  const [searchText, setSearchText] = useState('')
  const [timeout] = useState(250)

  function handleUpdateAnimesSearch() {
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

    return setTimeout.bind(null, handleUpdateAnimesSearch, timeout)
  }

  useEffect(() => {
    setCategory(route.params.category)
    setData(route.params.data)
    setFilteredData(route.params.data)
  }, [route.params.data, route.params.category])

  return (
    <Container>
      <Header description={`Categoria ${category}`} />

      <Main>
        <Section>
          <SearchInput
            placeholder="Filtre os animes"
            placeholderTextColor="#00000040"
            onChangeText={text => {
              const updateAnimesSearch = handleSearchText(text)
              updateAnimesSearch()
            }}
            value={searchText}
          />

          <TouchableOpacity
            onPress={handleUpdateAnimesSearch.bind(null, searchText)}
          >
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
              renderItem={({ item }) => (
                <Anime
                  imageURL={item.imageURL}
                  title={item.name}
                  description={item.synopsis}
                  style={styles.anime}
                />
              )}
              keyExtractor={item => item._id}
            />
          ) : (
            <NoFound />
          )}
        </Article>
      </Main>
    </Container>
  )
}

const styles = StyleSheet.create({
  anime: {
    marginRight: 20,
    marginBottom: 15
  }
})
