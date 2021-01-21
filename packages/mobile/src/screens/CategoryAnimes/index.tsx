import React, { useEffect, useState } from 'react'

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'

import { ScreenProps } from 'src/routes'
import { Header, Anime } from '@components'
import { AnimeComponentData } from '@screens/CategoriesAnimes'

import {
  Container,
  Main,
  Section,
  SearchInput,
  SearchIcon,
  Article
} from './styles'

import searchIcon from '@assets/icons/search.png'

function NoFound(): JSX.Element {
  return (
    <View style={styles.noFoundContainer}>
      <Text style={styles.noFoundText}>No Found</Text>
    </View>
  )
}

export function CategoryAnime({
  route
}: ScreenProps<'CategoryAnime'>): JSX.Element {
  const [data, setData] = useState<AnimeComponentData[]>([])
  const [filteredData, setFilteredData] = useState<AnimeComponentData[]>([])

  const [searchText, setSearchText] = useState('')

  function handleFilterAnimes(text: string) {
    if (text === '') {
      setFilteredData(data)
      return
    }

    const digits = String.raw`${text}`
    const regex = new RegExp(`^(${digits})`, 'gi')

    setFilteredData(data.filter(anime => anime.title.match(regex)))
  }

  function handleResetData(text: string) {
    if (text === '') {
      setFilteredData(data)
    }

    setSearchText(text)

    // handleFilterAnimes(text)
  }

  useEffect(() => {
    setData(route.params.data)
    setFilteredData(route.params.data)
  }, [])

  return (
    <Container>
      <Header description={`Categoria ${route.params.category}`} />

      <Main>
        <Section>
          <SearchInput
            placeholder="Filtre os animes"
            placeholderTextColor="#00000040"
            onChangeText={handleResetData}
            value={searchText}
          />

          <TouchableOpacity onPress={() => handleFilterAnimes(searchText)}>
            <SearchIcon source={searchIcon} />
          </TouchableOpacity>
        </Section>

        <Article>
          {filteredData.length >= 1 ? (
            <FlatList
              horizontal={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={filteredData}
              renderItem={({ item }) => (
                <Anime
                  imageURL={item.imageURL}
                  title={item.title}
                  description={item.description}
                  style={styles.anime}
                />
              )}
              keyExtractor={item => item.title}
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
  },
  noFoundContainer: {
    marginTop: 85
  },
  noFoundText: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 50,
    lineHeight: 57,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#EEEEEE85'
  }
})
