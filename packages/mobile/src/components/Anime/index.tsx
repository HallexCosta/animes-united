/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { AnimeResponse } from '@api/response'

import { Container, Image, Title, Description } from './styles'

export type AnimeProps = {
  data: AnimeResponse
  style?: {}
}

export function Anime({ data, style }: AnimeProps): JSX.Element {
  const {
    name: title,
    imageURL: url,
    yearRelease: year,
    streamings: { episodes, ovas }
  } = data

  const description = `${year} - ${episodes.length + ovas.length} eps`

  const navigation = useNavigation()

  function handleNavigateToAnimeDetailScreen(data: AnimeResponse) {
    navigation.navigate('AnimeDetail', {
      data
    })
  }

  return (
    <Container
      onPress={handleNavigateToAnimeDetailScreen.bind(null, data)}
      style={style}
    >
      <Image source={{ uri: url }} />

      <Title numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Title>

      <Description>{description}</Description>
    </Container>
  )
}
