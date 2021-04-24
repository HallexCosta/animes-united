import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 165px;
  height: 78px;

  justify-content: center;
  align-items: center;
`

export const Info = styled.View`
  position: absolute;

  width: 165px;
  height: 78px;
`

export const Thumbnail = styled.Image`
  width: 165px;
  height: 78px;

  opacity: 0.4;
  border-radius: 8px;
`

export const WatchedText = styled.Text`
  font-family: Nunito_700Bold;
  font-size: 14px;
  line-height: 19px;

  color: #ffffff;

  align-self: center;

  opacity: 0.3;
`

export const IconContainer = styled.View`
  width: 38px;
  height: 35px;

  position: absolute;

  left: 38.79%;
  right: 38.18%;
  top: 28.21%;
  bottom: 26.92%;
`

export const Detail = styled.View`
  position: absolute;

  left: 10.85%;
  right: 31.57%;
  top: 57.69%;
  bottom: 26.92%;
`

export const Title = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 10px;
  line-height: 12px;

  color: #f1f1f1;
`

export const Description = styled.Text`
  font-family: Nunito_400Regular;
  font-size: 9px;
  line-height: 12px;

  color: #f1f1f1;
`

export const QualityStreaming = styled.View`
  width: 21px;
  height: 15px;

  position: absolute;

  background-color: #00000070;

  border-radius: 4px;

  justify-content: center;

  left: 82.42%;
  right: 4.85%;
  top: 10.26%;
  bottom: 70.51%;
`

export const QualityStreamingText = styled.Text`
  font-family: Ubuntu_500Medium;
  font-size: 10px;
  line-height: 11px;

  text-align: center;

  color: #ffffff;
`
