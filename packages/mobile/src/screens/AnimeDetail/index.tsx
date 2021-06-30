import React, { useEffect, useState } from 'react'

import { StyleSheet } from 'react-native'

import { Feather } from '@expo/vector-icons'

import {
  Container,
  HeaderBackground,
  Section,
  Thumbnail,
  Info,
  Title,
  Description,
  Describe,
  DescribeText,
  DescribeValue,
  Main,
  Aside,
  DetailNavigation,
  NavigationButton,
  NavigationText,
  Synopsis,
  SynopsisDescription,
  MoreButton,
  MoreText,
  EpisodesContainer,
  FavoriteButton,
  FavoriteButtonText
} from './styles'

import animeBackground from '@assets/images/anime-thumbnail-default.jpg'

import { Header, Episode as EpisodeItem } from '@components'
import {
  AnimeResponse,
  EpisodeResponse,
  StreamingsResponse
} from '@api/response'
import { api } from '@animes-united/axios-config'

import { ScreenProps } from 'src/routes'

type EpisodesRenderProps = {
  data: EpisodeResponse[]
}

function Episodes({ data }: EpisodesRenderProps) {
  const renderItem = ({
    title,
    thumbnail,
    number,
    url,
    qualityStreaming
  }: EpisodeResponse) => (
    <EpisodeItem
      key={number}
      title={title}
      number={number}
      qualityStreaming={qualityStreaming}
      thumbnail={thumbnail}
      videoURL={url}
      style={styles.episodeItem}
    />
  )
  return <>{data.map(renderItem)}</>
}

export function AnimeDetail({
  route
}: ScreenProps<'AnimeDetail'>): JSX.Element {
  const [data, setData] = useState<Omit<AnimeResponse, '_id'>>({
    name: '',
    rating: 0,
    status: '',
    genre: '',
    studio: '',
    imageURL: '',
    synopsis: '',
    yearRelease: 0,
    streamings: {
      episodes: [] as EpisodeResponse[],
      ovas: [] as EpisodeResponse[]
    }
  })
  const [numberOfLines, setNumberOfLines] = useState(3)
  const [loadMoreSynopsis, setLoadMoreSynopsis] = useState(false)
  const [chevronDirection, setChevronDirection] = useState('down')

  function handleLoadMoreSynopsis() {
    setLoadMoreSynopsis(!loadMoreSynopsis)
    setNumberOfLines(loadMoreSynopsis ? 3 : 100)
    setChevronDirection(loadMoreSynopsis ? 'down' : 'up')
  }

  function countAnimeEpisodes(streamings: StreamingsResponse): number {
    return streamings.episodes.length + streamings.ovas.length
  }

  function normilizeAnimeNameRouteParam(name: string) {
    return name
      .split(' ')
      .map(name => name.trim().toLowerCase())
      .join('-')
  }

  useEffect(() => {
    async function updateAnimeDataOnDatabase(
      category: string,
      name: string
    ): Promise<AnimeResponse> {
      const nameRouteParam = normilizeAnimeNameRouteParam(name)
      const response = await api.put(`/animes/${category}/${nameRouteParam}`)
      return response.data
    }

    function checkForEpisodes(episodes: EpisodeResponse[]) {
      if (episodes.length > 0) {
        return true
      }
      return false
    }

    async function fetchAPI() {
      console.log('Load Anime Detail')
      let anime: AnimeResponse
      if (checkForEpisodes(route.params.data.streamings.episodes)) {
        console.log('Unnecessary update on database')
        anime = route.params.data
      } else {
        console.log('Necessary update on database')
        anime = await updateAnimeDataOnDatabase(
          route.params.category,
          route.params.data.name
        )
      }
      setData(anime)
      console.log(`Anime data: ${data}`)
    }

    fetchAPI()
  }, [route.params, data])

  return (
    <Container>
      <HeaderBackground source={animeBackground} />

      <Header description="" style={{ marginTop: 10, paddingLeft: 10 }} />

      <Section>
        <Thumbnail
          source={{
            uri: data.imageURL
          }}
        />

        <Info>
          <Title>{data.name}</Title>

          <Description>
            <Describe>
              <DescribeText>M. PONTOS</DescribeText>
              <DescribeValue>{data.rating}</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>QLD. STREAMING</DescribeText>
              <DescribeValue>HD</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>STATUS</DescribeText>
              <DescribeValue>{data.status}</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>QTD. EPISÓDIOS</DescribeText>
              <DescribeValue>
                {countAnimeEpisodes(data.streamings)}
              </DescribeValue>
            </Describe>
          </Description>
        </Info>
      </Section>

      <Main>
        <DetailNavigation>
          <NavigationButton>
            <NavigationText>Sinopse</NavigationText>
          </NavigationButton>

          <NavigationButton>
            <NavigationText>Franquia</NavigationText>
          </NavigationButton>

          <NavigationButton>
            <NavigationText>Recomendações</NavigationText>
          </NavigationButton>
        </DetailNavigation>

        <Aside>
          <Synopsis>
            <SynopsisDescription
              numberOfLines={numberOfLines}
              ellipsizeMode="tail"
            >
              {data.synopsis}
            </SynopsisDescription>
            <MoreButton onPress={handleLoadMoreSynopsis}>
              <MoreText>More</MoreText>
              <Feather
                name={`chevron-${chevronDirection}`}
                size={24}
                color="#8F8F8F"
              />
            </MoreButton>
          </Synopsis>

          <EpisodesContainer>
            <Episodes data={data.streamings.episodes} />
          </EpisodesContainer>
        </Aside>
      </Main>

      <FavoriteButton>
        <FavoriteButtonText>ADD TO LIST</FavoriteButtonText>
      </FavoriteButton>
    </Container>
  )
}

const styles = StyleSheet.create({
  episodeItem: {
    width: '45%',
    marginBottom: 10
  },
  article: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
