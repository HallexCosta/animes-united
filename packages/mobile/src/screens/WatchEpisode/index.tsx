import React, { useState } from 'react'
import VideoPlay, { VideoProperties } from 'react-native-video'

type WatchEpisodeProps = {
  url: string
}

export function WatchEpisode({ url: uri }: WatchEpisodeProps) {
  const [options] = useState<VideoProperties>({
    source: {
      uri: 'background'
    }
  })

  return <VideoPlay {...options} />
}
