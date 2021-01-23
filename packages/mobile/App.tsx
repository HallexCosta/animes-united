/* eslint-disable camelcase */
import React from 'react'
import { StatusBar } from 'react-native'

import { AppLoading } from 'expo'

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from '@expo-google-fonts/nunito'
import {
  Poppins_700Bold,
  Poppins_800ExtraBold
} from '@expo-google-fonts/poppins'

import { Routes } from './src/routes'

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Roboto_400Regular,
    Roboto_500Medium
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <Routes />

      <StatusBar barStyle="light-content" />
    </>
  )
}
