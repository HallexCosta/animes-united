import React from 'react'

import { Text } from 'react-native'

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
  Episodes,
  Episode,
  EpisodeThumbnail,
  EpisodePlayIcon,
  EpisodeWatched,
  EpisodeInfo,
  EpisodeDetail,
  EpisodeTitle,
  EpisodeDescription,
  QualityStreaming,
  QualityStreamingText,
  FavoriteButton,
  FavoriteButtonText
} from './styles'

import animeThumbnail from '../../assets/images/darling-in-the-fran-xx.jpg'
import animeBackground from '../../assets/images/anime-thumbnail-default.jpg'
import episodeThumbnail from '../../assets/images/DarlingintheFranXX01.jpg'
import episodePlayIcon from '../../assets/icons/play-icon.png'

import { Header } from '@components'

export function AnimeDetail(): JSX.Element {
  return (
    <Container>
      <HeaderBackground source={animeBackground} />

      <Header description="" style={{ marginTop: 10, paddingLeft: 10 }} />

      <Section>
        <Thumbnail source={animeThumbnail} />

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

        <Episodes>
          <Episode>
            <EpisodeThumbnail source={episodeThumbnail} />

            <EpisodeInfo>
              <EpisodeWatched>Assistido</EpisodeWatched>
              <QualityStreaming>
                <QualityStreamingText>HD</QualityStreamingText>
              </QualityStreaming>

              <EpisodePlayIcon source={episodePlayIcon} />

              <EpisodeDetail>
                <EpisodeTitle numberOfLines={1} ellipsizeMode="tail">
                  Darling in the fran xx
                </EpisodeTitle>
                <EpisodeDescription>EP - 01</EpisodeDescription>
              </EpisodeDetail>
            </EpisodeInfo>
          </Episode>
        </Episodes>
      </Main>

      <FavoriteButton>
        <FavoriteButtonText>ADD TO LIST</FavoriteButtonText>
      </FavoriteButton>
    </Container>
  )
}
