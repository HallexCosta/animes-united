import React, { useEffect, useState } from 'react'

import {
  StyleSheet,
  FlatList as Article,
  ListRenderItemInfo
} from 'react-native'

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
  EpisodesContainer,
  FavoriteButton,
  FavoriteButtonText
} from './styles'

import animeBackground from '@assets/images/anime-thumbnail-default.jpg'

import { Util } from '@util'
import { Header, Episode as EpisodeItem } from '@components'
import { EpisodeResponse } from '@api/response'

import { ScreenProps } from 'src/routes'

type EpisodesRenderProps = {
  data: EpisodeResponse[]
}

function Episodes({ data }: EpisodesRenderProps) {
  const renderItem = ({
    item: { title, thumbnail, number, url, qualityStreaming }
  }: ListRenderItemInfo<EpisodeResponse>) => (
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

  return (
    <Article
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.number.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={5}
      initialNumToRender={3}
      style={styles.article}
    />
  )
}

export function AnimeDetail({
  route,
  navigation
}: ScreenProps<'AnimeDetail'>): JSX.Element {
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([])

  useEffect(() => {
    function renderAnimes(): EpisodeResponse[] {
      const episodes = []

      for (let i = 1; i <= 24; i++) {
        episodes.push({
          id: Math.random().toString(),
          title: 'Darling in the fran xx',
          number: i,
          qualityStreaming: 'HD',
          thumbnail: `https://yayanimes.net/Miniaturas/2018/DarlingintheFranXX/DarlingintheFranXX${Util.pad(
            i
          )}.jpg`,
          url: 'https://dump.video/i/7BQ1FX.mp4'
        })
      }

      return episodes
    }

    const episodes = renderAnimes()
    setEpisodes(episodes)
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

        <EpisodesContainer>
          <Episodes data={episodes} />
        </EpisodesContainer>
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
    marginBottom: 10,
    marginRight: 10
  },
  article: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
