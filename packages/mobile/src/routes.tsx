import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { CategoriesAnimes } from '@screens'

const Stack = createStackNavigator()

export function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CategoriesAnimes" component={CategoriesAnimes} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
