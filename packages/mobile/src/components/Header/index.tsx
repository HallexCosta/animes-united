import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Container, Button, Image, Description } from './styles'

import iconArrowLeft from '@assets/icons/arrow-left.png'

type HeaderProps = {
  description: string
}

export function Header({ description }: HeaderProps): JSX.Element {
  const navigation = useNavigation()

  function handleNavigateToBackScreen() {
    navigation.goBack()
  }

  return (
    <Container>
      <Button onPress={handleNavigateToBackScreen}>
        <Image source={iconArrowLeft} />
      </Button>

      <Description>{description}</Description>
    </Container>
  )
}
