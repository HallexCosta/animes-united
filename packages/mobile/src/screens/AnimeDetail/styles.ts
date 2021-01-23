import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;

  background-color: #0c0c0c;
`

export const Section = styled.View`
  margin: 25px 10px 0 10px;

  flex-direction: row;
`

export const HeaderBackground = styled.Image`
  width: 360px;
  height: 214px;
  position: absolute;
`

export const Thumbnail = styled.Image`
  width: 127.76px;
  height: 171px;
`

export const Info = styled.View`
  margin: 15px;
`

export const Title = styled.Text`
  font-family: Poppins_700Bold;
  font-size: 16px;
  line-height: 17px;

  color: #ffffff;

  width: 198px;
`

export const Description = styled.View`
  width: 198px;

  margin-top: 18px;
`

export const Describe = styled.View`
  flex-direction: row;

  justify-content: space-between;
`

export const DescribeText = styled.Text`
  font-family: Roboto_500Medium;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: #afafaf;
`

export const DescribeValue = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 10px;
  line-height: 12px;
  text-align: right;

  color: #ffffff;
`

export const Main = styled.ScrollView`
  margin: 0 10px;
`

export const DetailNavigation = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;

  flex-direction: row;

  justify-content: space-between;
`

export const NavigationButton = styled.TouchableOpacity`
  border-style: solid;
  border-bottom-width: 3px;
  border-color: #0c1edf;
`

export const NavigationText = styled.Text`
  font-family: Poppins_500Medium;
  font-size: 12px;
  line-height: 18px;
  text-align: center;

  color: #ffffff;

  margin-bottom: 5px;

  padding-left: 10px;
  padding-right: 10px;
`

export const Synopsis = styled.View`
  margin-bottom: 15px;
`

export const SynopsisDescription = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  text-align: justify;

  letter-spacing: 0.1px;

  color: #ffffff;
`

export const MoreButton = styled.TouchableOpacity`
  flex-direction: row;

  justify-content: center;
  align-items: center;
`

export const MoreText = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 13px;
  line-height: 15px;

  align-items: center;
  text-align: justify;

  letter-spacing: 0.1px;

  color: #8f8f8f;
`

export const Episodes = styled.View``

export const Episode = styled.View`
  width: 165px;

  height: 78px;
`

export const EpisodeInfo = styled.View`
  position: absolute;

  width: 165px;
  height: 78px;
`

export const EpisodeThumbnail = styled.Image`
  width: 165px;
  height: 78px;

  opacity: 0.4;
  border-radius: 8px;
`

export const EpisodeWatched = styled.Text`
  font-family: Nunito_700Bold;
  font-size: 14px;
  line-height: 19px;

  color: #ffffff;

  align-self: center;

  opacity: 0.3;
`

export const EpisodePlayIcon = styled.Image`
  width: 38px;
  height: 35px;

  position: absolute;

  left: 38.79%;
  right: 38.18%;
  top: 28.21%;
  bottom: 26.92%;
`

export const EpisodeDetail = styled.View`
  position: absolute;

  left: 10.85%;
  right: 31.57%;
  top: 57.69%;
  bottom: 26.92%;
`

export const EpisodeTitle = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 10px;
  line-height: 12px;

  color: #f1f1f1;
`

export const EpisodeDescription = styled.Text`
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

export const FavoriteButton = styled.TouchableOpacity`
  width: 360px;
  height: 45px;

  background: #365af1;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  justify-content: center;
`

export const FavoriteButtonText = styled.Text`
  font-family: Archivo_700Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  text-align: center;

  color: #f5f5f5;
`
