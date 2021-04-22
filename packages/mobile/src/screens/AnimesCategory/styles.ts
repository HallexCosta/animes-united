import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;

  padding: 0 51px 0 41px;

  background-color: #0c0c0c;
`

export const Main = styled.View`
  margin-top: 18px;
`

export const Section = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`

export const SearchInput = styled.TextInput`
  height: 39px;
  width: 225px;

  background-color: white;

  border-radius: 10px;

  padding-left: 17px;

  font-family: ${props =>
    props.value?.length !== undefined ? 'Ubuntu_500Medium' : 'Ubuntu_700Bold'};
  font-size: ${props => (props.value?.length !== undefined ? '12px' : '14px')};
  line-height: ${props =>
    props.value?.length !== undefined ? '16px' : '14px'};

  color: #2f2f2f;
`

export const SearchIcon = styled.Image``

export const Article = styled.View``
