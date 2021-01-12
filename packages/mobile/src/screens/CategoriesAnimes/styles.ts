import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;

  padding-left: 10px;

  background-color: #0c0c0c;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-right: 10px;

  margin-top: 16px;
`

export const GoBackScreen = styled.Image``

export const Info = styled.Text`
  color: white;
  font-family: Ubuntu_700Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
`

export const Main = styled.ScrollView``

export const Section = styled.View`
  margin-bottom: 16px;
`

export const Head = styled.View`
  margin-top: 10px;
  margin-right: 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Category = styled.Text`
  color: white;
  font-family: Poppins_700Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
`

export const ViewMore = styled.Text`
  color: white;
  font-family: Poppins_700Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
`

export const Article = styled.ScrollView`
  height: 205px;
  margin-top: 5px;
  flex-direction: row;
`
