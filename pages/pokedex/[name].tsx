import { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { MainLayout } from '../../components/layout';
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces';
import { pokeApi } from '../api';
import { getPokemonInfo, localFavorites } from '../../utils';
import QueryString from 'qs';

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
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>
              <Button
                color={'gradient'}
                ghost={!isInFavorite}
                onClick={onToggleFavorite}
              >
                {isInFavorite ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
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
  const query = QueryString.stringify({
    limit: 151,
    offset: 0,
  });

  const response = await fetch(`${pokeApi}/pokemon?${query}`);
  const { results }: PokemonListResponse = await response.json();
  const paths = results.map(({ name }: Partial<SmallPokemon>) => ({
    params: { name },
  }));

  return {
    paths,
    fallback: false, // 'blocking' to block access to page
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name: pokemonName } = params as { name: string };

  return {
    props: { pokemon: await getPokemonInfo(pokemonName) },
  };
};

export default PokemonPage;
