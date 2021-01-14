import React from 'react'
import { ImageSourcePropType } from 'react-native'

import { Container, Image, Title, Description } from './styles'

export type AnimeProps = {
  image: ImageSourcePropType
  title: string
  description: string
}

export function Anime({ image, title, description }: AnimeProps): JSX.Element {
  return (
    <Container>
      <Image source={image} />

      <Title numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Title>

      <Description>{description}</Description>
    </Container>
  )
}
