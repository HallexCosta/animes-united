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
  DetailNavigation,
  NavigationButton,
  NavigationText,
  Synopsis,
  SynopsisDescription,
  MoreButton,
  MoreText,
  EpisodesScrollView,
  Episodes,
  FavoriteButton,
  FavoriteButtonText
} from './styles'

import animeBackground from '@assets/images/anime-thumbnail-default.jpg'

import { Util } from '@util'
import { Header, EpisodeProps, Episode } from '@components'
import { EpisodeResponse } from '@api/response'

import { ScreenProps } from 'src/routes'

type EpisodeDataComponent = Omit<EpisodeProps, 'style'>

type EpisodesRenderProps = {
  data: EpisodeDataComponent[]
}

function EpisodesRender({ data }: EpisodesRenderProps) {
  return (
    <Episodes>
      {Array.from(data).map(
        ({ title, number, qualityStreaming, thumbnail, videoURL }) => (
          <Episode
            key={number}
            title={title}
            number={number}
            qualityStreaming={qualityStreaming}
            thumbnail={thumbnail}
            videoURL={videoURL}
            style={styles.episodeItem}
          />
        )
      )}
    </Episodes>
  )
}

export function AnimeDetail({
  route,
  navigation
}: ScreenProps<'AnimeDetail'>): JSX.Element {
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([])

  function viewEpisodesDataComponent(
    episodes: EpisodeResponse[]
  ): EpisodeDataComponent[] {
    return episodes.map(episode => ({
      title: episode.title,
      number: episode.number,
      thumbnail: episode.thumbnail,
      qualityStreaming: episode.qualityStreaming,
      videoURL: episode.url
    }))
  }

  useEffect(() => {
    function renderAnimes(): EpisodeResponse[] {
      const episodes = []
      for (let i = 1; i <= 24; i++) {
        episodes.push({
          title: 'Darling in the fran xx',
          number: i,
          qualityStreaming: 'HD',
          thumbnail: `https://yayanimes.net/Miniaturas/2018/DarlingintheFranXX/DarlingintheFranXX${Util.pad(
            i
          )}.jpg`,
          url: 'https://testing-video.com.br'
        })
      }

      return episodes
    }

    const episodes = renderAnimes()
    setEpisodes(episodes)
    console.log('List Episodes', episodes)
  }, [])

  return (
    <Container>
      <HeaderBackground source={animeBackground} />

      <Header description="" style={{ marginTop: 10, paddingLeft: 10 }} />

      <Section>
        <Thumbnail
          source={{
            uri:
              'http://static.tvmaze.com/uploads/images/original_untouched/138/346431.jpg'
          }}
        />

        <Info>
          <Title>Darling in the fran xx 1nd Season</Title>

          <Description>
            <Describe>
              <DescribeText>M. PONTOS</DescribeText>
              <DescribeValue>4.9/5</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>QLD. STREAMING</DescribeText>
              <DescribeValue>HD</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>STATUS</DescribeText>
              <DescribeValue>COMPLETO</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>QTD. EPISÓDIOS</DescribeText>
              <DescribeValue>24</DescribeValue>
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

        <Synopsis>
          <SynopsisDescription>
            “Eles sonham em um dia voarem pelo céu sem fim, mesmo que estejam
            dolorosamente cientes de quão longe é o céu além da redoma que
            bloqueia o seu …
          </SynopsisDescription>
          <MoreButton>
            <MoreText>More</MoreText>
            <Feather name="chevron-down" size={24} color="#8F8F8F" />
          </MoreButton>
        </Synopsis>

        <EpisodesScrollView>
          <EpisodesRender data={viewEpisodesDataComponent(episodes)} />
        </EpisodesScrollView>
      </Main>

      <FavoriteButton>
        <FavoriteButtonText>ADD TO LIST</FavoriteButtonText>
      </FavoriteButton>
    </Container>
  )
}

const styles = StyleSheet.create({
  episodeItem: {
    width: 'auto',
    marginBottom: 10
  }
})
