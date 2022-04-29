import React from 'react';
import { Grid, Image, Text } from '@nextui-org/react';

import { pokemonSvg } from '../../utils';

export const NoFavorites = () => {
  return (
    <Grid.Container
      alignItems="center"
      css={{ height: 'calc(100vh - 70px)' }}
      direction="column"
      justify="center"
    >
      <Text h1>No hay favoritos</Text>
      <Image
        src={pokemonSvg(150)}
        alt="No image"
        css={{ opacity: 0.5 }}
        height="100"
        width={100}
      />
    </Grid.Container>
  );
};
