import React, { useRef, useState, useEffect } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Video as VideoAV } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

import { Container, Video } from './styles'

import { ScreenProps } from '@routes'

export function WatchEpisode({ route }: ScreenProps<'WatchEpisode'>) {
  const videoRef = useRef<VideoAV>(null)
  const [isFullscreen, setIsFullscreen] = useState(true)
  const [uri, setUri] = useState('')

  function onLayout(event: LayoutChangeEvent) {
    event.preventDefault()
  }

  async function changeScreenToLandscape() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    )
    setIsFullscreen(true)
  }

  async function changeScreenToPortrait() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    )
    setIsFullscreen(false)
  }

  async function onLoadStart() {
    await videoRef?.current?.presentFullscreenPlayer()
    setIsFullscreen(true)
  }

  async function onFullscreenUpdate() {
    isFullscreen
      ? await changeScreenToPortrait()
      : await changeScreenToLandscape()
  }

  useEffect(() => {
    setUri(route.params.data)
  }, [route.params.data])

  return (
    <Container>
      <Video
        ref={videoRef}
        source={{
          uri
        }}
        rate={1.0}
        volume={0.1}
        isMuted={false}
        useNativeControls={true}
        shouldPlay={true}
        resizeMode="contain"
        onLayout={onLayout}
        onLoadStart={onLoadStart}
        onFullscreenUpdate={onFullscreenUpdate}
      />
    </Container>
  )
}
