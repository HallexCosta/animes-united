import React from 'react'

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

import { Util } from '@util'

import PlayIcon from '@assets/icons/play-icon.svg'

export type EpisodeProps = {
  title: string
  number: number
  thumbnail: string
  qualityStreaming: string
  videoURL: string
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
  return (
    <Container key={number} style={style} activeOpacity={.65} >
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
