import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'

import {
  AnimeComponentData,
  CategoriesAnimes,
  CategoryAnimes,
  AnimeDetail
} from '@screens'

const Stack = createStackNavigator()

type RootStackParamList = {
  CategoryAnimes: {
    category: string
    data: AnimeComponentData[]
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

type ScreensProps = {
  CategoryAnimes: {
    route: CategoryAnimeScreenRouteProp
    navigation: CategoryAnimeScreenNavigationProp
  }
}

export type ScreenProps<
  ScreenName extends keyof ScreensProps
> = ScreensProps[ScreenName]

export function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AnimeDetail"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CategoriesAnimes" component={CategoriesAnimes} />
        <Stack.Screen name="CategoryAnimes" component={CategoryAnimes} />
        <Stack.Screen name="AnimeDetail" component={AnimeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
