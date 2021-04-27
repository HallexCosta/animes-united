import styled from 'styled-components/native'
import { Video as ExpoVideo } from 'expo-av'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Video = styled(ExpoVideo)`
  width: 100%;
  height: 100%;
`
