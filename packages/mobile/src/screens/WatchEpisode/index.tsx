import React, { useRef } from 'react'
import { LayoutChangeEvent } from 'react-native'

import { Container, Video } from './styles'

type WatchEpisodeProps = {
  url: string
}
export function WatchEpisode({ url: uri }: WatchEpisodeProps) {
  const videoRef = useRef(null)

  function onLayout(event: LayoutChangeEvent) {
    event.preventDefault()
  }

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
        useNativeControls={true}
        shouldPlay={true}
        resizeMode="contain"
        onLayout={onLayout}
      />
    </Container>
  )
}
