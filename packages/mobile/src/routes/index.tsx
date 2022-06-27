import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'

import {
  AnimesCategories,
  AnimesCategory,
  AnimeDetail,
  WatchEpisode
} from '@screens'

import { AnimeResponse } from '@api/response'

const Stack = createStackNavigator()

type RootStackParamList = {
  AnimesCategory: {
    category: string
    data: AnimeResponse[]
  }
  AnimeDetail: {
    category: string
    data: AnimeResponse
  }
  WatchEpisode: {
    data: string
  }
}

type AnimesCategoryRouteProp = RouteProp<RootStackParamList, 'AnimesCategory'>

type AnimesCategoryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimesCategory'
>

type AnimeDetailRouteProp = RouteProp<RootStackParamList, 'AnimeDetail'>

type AnimeDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimeDetail'
>

type WatchEpisodeRouteProp = RouteProp<RootStackParamList, 'WatchEpisode'>

export type WatchEpisodeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WatchEpisode'
>

type ScreensProps = {
  AnimesCategory: {
    route: AnimesCategoryRouteProp
    navigation: AnimesCategoryNavigationProp
  }
  AnimeDetail: {
    route: AnimeDetailRouteProp
    navigation: AnimeDetailNavigationProp
  }
  WatchEpisode: {
    route: WatchEpisodeRouteProp
    navigation: WatchEpisodeNavigationProp
  }
}

export type ScreenProps<
  ScreenName extends keyof ScreensProps
> = ScreensProps[ScreenName]

export default function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AnimesCategories"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AnimesCategories" component={AnimesCategories} />
        <Stack.Screen name="AnimesCategory" component={AnimesCategory} />
        <Stack.Screen name="AnimeDetail" component={AnimeDetail} />
        <Stack.Screen name="WatchEpisode" component={WatchEpisode} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
