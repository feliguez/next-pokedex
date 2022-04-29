import type { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';
import qs from 'qs';

import { pokeApi } from './api';
import { MainLayout } from '../components/layout';
import { SmallPokemon, PokemonListResponse } from '../interfaces';
import { PokemonCard } from '../components/pokemon';
import { pokemonSvg } from '../utils';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <>
      <MainLayout title="Pokemon Static Pokedex">
        <Grid.Container gap={2} justify="center">
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </Grid.Container>
      </MainLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const query = qs.stringify({
    limit: 151,
    offset: 0,
  });
  const response = await fetch(`${pokeApi}/pokemon?${query}`);
  const { results }: PokemonListResponse = await response.json();

  const pokemons: SmallPokemon[] = results.map((item, index) => {
    const id = index + 1;
    return {
      ...item,
      id,
      image: pokemonSvg(id),
    };
  });

  return {
    props: { pokemons },
  };
};

export default HomePage;
