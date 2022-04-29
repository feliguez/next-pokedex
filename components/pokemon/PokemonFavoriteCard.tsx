import React, { FC } from 'react';
import NextLink from 'next/link';

import { Card, Grid, Row, Text, Link } from '@nextui-org/react';
import { pokemonSvg } from '../../utils';

interface Props {
  pokemonId: number;
}

export const PokemonFavoriteCard: FC<Props> = ({ pokemonId: id }) => {
  return (
    <Grid xs={6} sm={4} md={3} lg={2} xl={1} key={id}>
      <Card hoverable clickable css={{ w: '100%', p: 0 }}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={pokemonSvg(id)} width="100%" height={200} />
          <NextLink href={`/pokemon/${id}`} passHref>
            <Link
              css={{
                position: 'absolute',
                top: 0,
                height: '100%',
                width: '100%',
                zIndex: 2,
              }}
            />
          </NextLink>
        </Card.Body>
        <Card.Footer
          blur
          css={{
            bgBlur: '#000000',
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row justify="space-between">
            {/* <Text transform="capitalize">{name}</Text> */}
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
