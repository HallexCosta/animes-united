import React, { useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Video as VideoAV } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

import { Container, Video } from './styles'

type WatchEpisodeProps = {
  url: string
}

export function WatchEpisode({ url: uri }: WatchEpisodeProps) {
  const videoRef = useRef<VideoAV>(null)

  function onLayout(event: LayoutChangeEvent) {
    event.preventDefault()
  }

  async function changeScreenToLandscape() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    )
  }

  async function changeScreenToPortrait() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    )
  }

  async function onLoadStart() {
    videoRef?.current?.presentFullscreenPlayer()
  }

  useEffect(() => {
    changeScreenToLandscape()

    return () => {
      changeScreenToPortrait()
    }
  }, [])

  return (
    <Container>
      <Video
        ref={videoRef}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        rate={1.0}
        volume={0.1}
        isMuted={false}
        shouldPlay={true}
        resizeMode="contain"
        onLayout={onLayout}
        onLoadStart={onLoadStart}
      />
    </Container>
  )
}
