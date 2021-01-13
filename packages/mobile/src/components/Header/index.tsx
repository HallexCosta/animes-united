import React from 'react'

import { Container, Button, Image, Description } from './styles'

import iconArrowLeft from '@assets/icons/arrow-left.png'

type HeaderProps = {
  description: string
}

export function Header({ description }: HeaderProps): JSX.Element {
  return (
    <Container>
      <Button>
        <Image source={iconArrowLeft} />
      </Button>

      <Description>{description}</Description>
    </Container>
  )
}
