import React from 'react'

import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Thumbnail,
  Info,
  WatchedText,
  QualityStreaming,
  QualityStreamingText,
  Detail,
  Title,
  Description,
  IconContainer
} from './styles'

import { WatchEpisodeNavigationProp } from '@routes'

import { Util } from '@util'

import PlayIcon from '@assets/icons/play-icon.svg'

export type EpisodeProps = {
  title: string
  number: number
  thumbnail: string
  qualityStreaming: string
  videoURL: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: {}
}

export function Episode({
  title,
  number,
  thumbnail,
  qualityStreaming,
  videoURL,
  style
}: EpisodeProps): JSX.Element {
  const navigation = useNavigation<WatchEpisodeNavigationProp>()

  function handleNavigateToWatchEpisode(url: string) {
    navigation.navigate('WatchEpisode', {
      data: url
    })
  }

  return (
    <Container
      key={number}
      onPress={handleNavigateToWatchEpisode.bind(null, videoURL)}
      style={style}
      activeOpacity={0.65}
    >
      <Thumbnail source={{ uri: thumbnail }} />

      <Info>
        <WatchedText>Assistido</WatchedText>
        <QualityStreaming>
          <QualityStreamingText>{qualityStreaming}</QualityStreamingText>
        </QualityStreaming>

        <IconContainer>
          <PlayIcon />
        </IconContainer>

        <Detail>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Title>
          <Description>EP - {Util.pad(number)}</Description>
        </Detail>
      </Info>
    </Container>
  )
}
