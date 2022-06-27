/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

import { Archivo_700Bold } from '@expo-google-fonts/archivo'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from '@expo-google-fonts/nunito'
import {
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_800ExtraBold
} from '@expo-google-fonts/poppins'

import Routes from './src/routes'

export default function App(): JSX.Element {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Roboto_400Regular,
    Roboto_500Medium
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  })

  if (!fontsLoaded || !appIsReady) return null

  return (
    <>
      <Routes />

      <StatusBar barStyle="light-content" />
    </>
  )
}
