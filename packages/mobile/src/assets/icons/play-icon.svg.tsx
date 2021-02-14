import React from 'react'
import Svg, { Ellipse, G, Path } from 'react-native-svg'

export default function Icon(): JSX.Element {
  return (
    <Svg width="38" height="35" viewBox="0 0 38 35" fill="none">
      <Ellipse opacity="0.2" cx="19" cy="17.5" rx="19" ry="17.5" fill="white" />
      <G opacity="0.4">
        <Path
          opacity="0.4"
          d="M14 9L28 18L14 27V9Z"
          fill="#F1F1F1"
          stroke="#F1F1F1"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  )
}
