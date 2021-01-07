import React from 'react'
import { StatusBar } from 'react-native'

import { Routes } from './src/routes'

export default function App(): JSX.Element {
  return (
    <>
      <Routes />

      <StatusBar barStyle="light-content" />
    </>
  )
}
