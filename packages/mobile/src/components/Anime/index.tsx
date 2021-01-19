/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

import { Container, Image, Title, Description } from './styles'

export type AnimeProps = {
  imageURL: string
  title: string
  description: string
  style?: {}
}

export function Anime({
  imageURL,
  title,
  description,
  style
}: AnimeProps): JSX.Element {
  return (
    <Container style={style}>
      <Image source={{ uri: imageURL }} />

      <Title numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Title>

      <Description>{description}</Description>
    </Container>
  )
}
