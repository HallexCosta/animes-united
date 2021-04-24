import React, { useEffect, useState } from 'react'

import { StyleSheet } from 'react-native'

import { Feather } from '@expo/vector-icons'

import {
  Container,
  HeaderBackground,
  Section,
  Thumbnail,
  Info,
  Title,
  Description,
  Describe,
  DescribeText,
  DescribeValue,
  Main,
  Aside,
  DetailNavigation,
  NavigationButton,
  NavigationText,
  Synopsis,
  SynopsisDescription,
  MoreButton,
  MoreText,
  EpisodesContainer,
  FavoriteButton,
  FavoriteButtonText
} from './styles'

import animeBackground from '@assets/images/anime-thumbnail-default.jpg'

import { Util } from '@util'
import { Header, Episode as EpisodeItem } from '@components'
import { AnimeResponse, EpisodeResponse } from '@api/response'

import { ScreenProps } from 'src/routes'

type EpisodesRenderProps = {
  data: EpisodeResponse[]
}

function Episodes({ data }: EpisodesRenderProps) {
  const renderItem = ({
    title,
    thumbnail,
    number,
    url,
    qualityStreaming
  }: EpisodeResponse) => (
    <EpisodeItem
      key={number}
      title={title}
      number={number}
      qualityStreaming={qualityStreaming}
      thumbnail={thumbnail}
      videoURL={url}
      style={styles.episodeItem}
    />
  )
  return <>{data.map(renderItem)}</>
}

export function AnimeDetail({
  route
}: ScreenProps<'AnimeDetail'>): JSX.Element {
  const [data, setData] = useState<AnimeResponse[]>([])
  const [loadMoreSynopsis, setLoadMoreSynopsis] = useState(false)

  function handleLoadMoreSynopsis() {
    setLoadMoreSynopsis(!loadMoreSynopsis)
  }

  function renderAnimes(): EpisodeResponse[] {
    const episodes = []

    for (let i = 1; i <= 24; i++) {
      episodes.push({
        id: Math.random().toString(),
        title: 'Darling in the fran xx',
        number: i,
        qualityStreaming: 'HD',
        thumbnail: `https://yayanimes.net/Miniaturas/2018/DarlingintheFranXX/DarlingintheFranXX${Util.pad(
          i
        )}.jpg`,
        url: 'https://dump.video/i/7BQ1FX.mp4'
      })
    }

    return episodes
  }

  useEffect(() => {
    setData(route.params.data)
    console.log(`Anime data: ${route.params.data}`)
  }, [route.params.data])

  return (
    <Container>
      <HeaderBackground source={animeBackground} />

      <Header description="" style={{ marginTop: 10, paddingLeft: 10 }} />

      <Section>
        <Thumbnail
          source={{
            uri:
              'http://static.tvmaze.com/uploads/images/original_untouched/138/346431.jpg'
          }}
        />

        <Info>
          <Title>Darling in the fran xx 1nd Season</Title>

          <Description>
            <Describe>
              <DescribeText>M. PONTOS</DescribeText>
              <DescribeValue>4.9/5</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>QLD. STREAMING</DescribeText>
              <DescribeValue>HD</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>STATUS</DescribeText>
              <DescribeValue>COMPLETO</DescribeValue>
            </Describe>

            <Describe>
              <DescribeText>QTD. EPISÓDIOS</DescribeText>
              <DescribeValue>24</DescribeValue>
            </Describe>
          </Description>
        </Info>
      </Section>

      <Main>
        <DetailNavigation>
          <NavigationButton>
            <NavigationText>Sinopse</NavigationText>
          </NavigationButton>

          <NavigationButton>
            <NavigationText>Franquia</NavigationText>
          </NavigationButton>

          <NavigationButton>
            <NavigationText>Recomendações</NavigationText>
          </NavigationButton>
        </DetailNavigation>

        <Aside>
          <Synopsis>
            {loadMoreSynopsis ? (
              <SynopsisDescription>
                &ldquo;Eles sonham em um dia voarem pelo céu sem fim, mesmo que
                estejam dolorosamente cientes de quão longe é o céu além da
                redoma que bloqueia o seu voo. {'\n\n'}
                Em um futuro distante a humanidade se estabeleceu em
                cidades-forte móveis, chamadas de Plantações, para viverem pelas
                terras desérticas e a civilização floresceu. Dentro da cidade há
                o alojamento dos pilotos chamado de Mistilteinn, também
                conhecido como gaiola. É aí que as crianças vivem... Sem saber
                de nada do mundo exterior nem do vasto céu. A única missão da
                vida deles era o voo.{'\n\n'}
                Seus inimigos são os organismos gigantes e misteriosos
                conhecidos como Estridossauros. As crianças pilotam robôs
                chamados de FRANXX para enfrentar esses monstros desconhecidos
                porque eles acreditam que esse é o seu propósito na vida. Em
                meio a eles havia um garoto que uma vez foi chamado de criança
                prodígio: Código n° 016, Hiro. Contudo, agora ele é um
                fracassado e é considerado dispensável. Aqueles que não
                conseguem pilotar os FRANXX basicamente não existem.
                {'\n\n'}
                Um dia, uma garota misteriosa chamada Zero Two aparece na frente
                de Hiro. Da cabeça dela cresciam dois chifres fascinantes.
                {'\n\n'}
                &ldquo;Eu te achei, meu Darling&rdquo;&rdquo;.
              </SynopsisDescription>
            ) : (
              <SynopsisDescription numberOfLines={3} ellipsizeMode="tail">
                &ldquo;Eles sonham em um dia voarem pelo céu sem fim, mesmo que
                estejam dolorosamente cientes de quão longe é o céu além da
                redoma que bloqueia o seu voo. {'\n\n'}
                Em um futuro distante a humanidade se estabeleceu em
                cidades-forte móveis, chamadas de Plantações, para viverem pelas
                terras desérticas e a civilização floresceu. Dentro da cidade há
                o alojamento dos pilotos chamado de Mistilteinn, também
                conhecido como gaiola. É aí que as crianças vivem... Sem saber
                de nada do mundo exterior nem do vasto céu. A única missão da
                vida deles era o voo.{'\n\n'}
                Seus inimigos são os organismos gigantes e misteriosos
                conhecidos como Estridossauros. As crianças pilotam robôs
                chamados de FRANXX para enfrentar esses monstros desconhecidos
                porque eles acreditam que esse é o seu propósito na vida. Em
                meio a eles havia um garoto que uma vez foi chamado de criança
                prodígio: Código n° 016, Hiro. Contudo, agora ele é um
                fracassado e é considerado dispensável. Aqueles que não
                conseguem pilotar os FRANXX basicamente não existem.
                {'\n\n'}
                Um dia, uma garota misteriosa chamada Zero Two aparece na frente
                de Hiro. Da cabeça dela cresciam dois chifres fascinantes.
                {'\n\n'}
                &ldquo;Eu te achei, meu Darling&rdquo;&rdquo;.
              </SynopsisDescription>
            )}
            <MoreButton onPress={handleLoadMoreSynopsis}>
              <MoreText>More</MoreText>
              <Feather name="chevron-down" size={24} color="#8F8F8F" />
            </MoreButton>
          </Synopsis>

          <EpisodesContainer>
            <Episodes data={renderAnimes()} />
          </EpisodesContainer>
        </Aside>
      </Main>

      <FavoriteButton>
        <FavoriteButtonText>ADD TO LIST</FavoriteButtonText>
      </FavoriteButton>
    </Container>
  )
}

const styles = StyleSheet.create({
  episodeItem: {
    width: '45%',
    marginBottom: 10
  },
  article: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
