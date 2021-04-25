import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'

import {
  AnimesCategoriesScreen,
  AnimesCategoryScreen,
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
    data: AnimeResponse[]
  }
  WatchEpisode: {
    data: string
  }
}

type AnimesCategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'AnimesCategory'
>

type AnimesCategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimesCategory'
>

type AnimeDetailScreenRouteProp = RouteProp<RootStackParamList, 'AnimeDetail'>

type AnimeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimeDetail'
>

type WatchEpisodeScreenRouteProp = RouteProp<RootStackParamList, 'WatchEpisode'>

export type WatchEpisodeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WatchEpisode'
>

type ScreensProps = {
  AnimesCategory: {
    route: AnimesCategoryScreenRouteProp
    navigation: AnimesCategoryScreenNavigationProp
  }
  AnimeDetail: {
    route: AnimeDetailScreenRouteProp
    navigation: AnimeDetailScreenNavigationProp
  }
  WatchEpisode: {
    route: WatchEpisodeScreenRouteProp
    navigation: WatchEpisodeScreenNavigationProp
  }
}

export type ScreenProps<
  ScreenName extends keyof ScreensProps
> = ScreensProps[ScreenName]

export function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AnimesCategoriesScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="AnimesCategoriesScreen"
          component={AnimesCategoriesScreen}
        />
        <Stack.Screen
          name="AnimesCategoryScreen"
          component={AnimesCategoryScreen}
        />
        <Stack.Screen name="AnimeDetail" component={AnimeDetail} />
        <Stack.Screen name="WatchEpisode" component={WatchEpisode} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
