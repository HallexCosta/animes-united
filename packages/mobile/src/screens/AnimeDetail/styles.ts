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

export const Main = styled.View`
  margin: 0 10px;
  flex: 1;
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

export const EpisodesContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
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
