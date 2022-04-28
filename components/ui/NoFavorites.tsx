import { Grid, Image, Text } from '@nextui-org/react';
import React from 'react';
import { MainLayout } from '../layout';

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
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${150}.svg`}
        alt="No image"
        css={{ opacity: 0.5 }}
        height="100"
        width={100}
      />
    </Grid.Container>
  );
};
