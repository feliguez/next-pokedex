import React, { FC } from 'react';
import { Grid } from '@nextui-org/react';

import { PokemonFavoriteCard } from '../pokemon';
import { NoFavorites } from './NoFavorites';

interface Props {
  pokemons: number[];
}

export const Favorites: FC<Props> = ({ pokemons }) => {
  return (
    <>
      {pokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <Grid.Container gap={2} justify="center">
          {pokemons.map((id) => (
            <PokemonFavoriteCard pokemonId={id} key={id} />
          ))}
        </Grid.Container>
      )}
    </>
  );
};
