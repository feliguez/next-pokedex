import { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Row,
  Text,
} from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { MainLayout } from '../../components/layout';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { id, name, sprites } = pokemon;
  const [isInFavorite, setIsInFavorite] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(id);
    setIsInFavorite(!isInFavorite);

    if (!isInFavorite) {
      confetti({
        particleCount: 100,
        angle: -120,
        spread: 160,
        origin: { x: 1, y: -0.1 },
      });
    }
  };

  useEffect(() => setIsInFavorite(localFavorites.isFavorite(id)), [id]);

  return (
    <MainLayout title={name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Header>
              <Row justify="center">
                <Text
                  h1
                  transform="capitalize"
                  css={{
                    textGradient: '45deg, $blue500 -20%, $pink500 50%',
                  }}
                  weight="bold"
                >
                  {name}
                </Text>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Image
                src={
                  sprites.other?.dream_world.front_default ||
                  '/images/pokeapi.png'
                }
                alt={name}
                width={'100%'}
                height={200}
              />
            </Card.Body>
            <Card.Footer css={{ paddingBottom: '0' }}>
              <Row justify="flex-end">
                <Text>#{id}</Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Row justify="flex-end">
                <Button
                  auto
                  color={'gradient'}
                  ghost={!isInFavorite}
                  onClick={onToggleFavorite}
                  rounded
                  shadow={!isInFavorite}
                >
                  {isInFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </Button>
              </Row>
            </Card.Header>
            <Card.Body>
              <Text h3>Sprites:</Text>
              <Container display="flex">
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </MainLayout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const paths = [...Array(151)].map((value, index) => {
    const id = index + 1;
    return {
      params: { id: id.toString() },
    };
  });

  return {
    paths,
    // fallback: false, // 'blocking' to block access to page
    fallback: 'blocking', // 'blocking' to block access to page
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id: pokemonId } = params as { id: string };

  const pokemon = await getPokemonInfo(pokemonId);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: { pokemon },
    revalidate: 86400, //60 * 60 * 24
  };
};

export default PokemonPage;
