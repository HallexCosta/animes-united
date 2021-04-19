/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Container, Button, Image, Description } from './styles'

import iconArrowLeft from '@assets/icons/arrow-left.png'

type HeaderProps = {
  description?: string
  style?: {}
}

export function Header({ description, style }: HeaderProps): JSX.Element {
  const navigation = useNavigation()

  function handleNavigateToBackScreen() {
    navigation.goBack()
  }

  return (
    <Container style={style}>
      <Button onPress={handleNavigateToBackScreen}>
        <Image source={iconArrowLeft} />
      </Button>

      {description ? <Description>{description}</Description> : null}
    </Container>
  )
}
