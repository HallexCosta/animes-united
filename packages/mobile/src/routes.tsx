import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'

import { CategoriesAnimesScreen, CategoryAnimes, AnimeDetail } from '@screens'
import { AnimeResponse, EpisodeResponse } from '@api/response'

const Stack = createStackNavigator()

type RootStackParamList = {
  CategoryAnimes: {
    category: string
    data: AnimeResponse[]
  }
  AnimeDetail: {
    category: string
    name: string
    data: EpisodeResponse[]
  }
}

type CategoryAnimeScreenRouteProp = RouteProp<
  RootStackParamList,
  'CategoryAnimes'
>

type CategoryAnimeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategoryAnimes'
>

type AnimeDetailScreenRouteProp = RouteProp<RootStackParamList, 'AnimeDetail'>

type AnimeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AnimeDetail'
>

type ScreensProps = {
  CategoryAnimes: {
    route: CategoryAnimeScreenRouteProp
    navigation: CategoryAnimeScreenNavigationProp
  }
  AnimeDetail: {
    route: AnimeDetailScreenRouteProp
    navigation: AnimeDetailScreenNavigationProp
  }
}

export type ScreenProps<
  ScreenName extends keyof ScreensProps
> = ScreensProps[ScreenName]

export function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CategoriesAnimesScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="CategoriesAnimesScreen"
          component={CategoriesAnimesScreen}
        />
        <Stack.Screen name="CategoryAnimes" component={CategoryAnimes} />
        <Stack.Screen name="AnimeDetail" component={AnimeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
