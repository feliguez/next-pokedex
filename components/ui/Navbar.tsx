import Image from 'next/image';
import NextLink from 'next/link';

import { Link, Text, useTheme } from '@nextui-org/react';
import { pokemonSvg } from '../../utils';

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        padding: `${theme?.space[2].value} ${theme?.space[10].value}`,
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        src={pokemonSvg(Math.floor(Math.random() * 150 + 1))}
        alt="image"
        width={70}
        height={70}
      />
      <NextLink href="/" passHref>
        <Link css={{ marginLeft: theme?.space[2].value }}>
          <Image
            src={`/images/pokeapi.png`}
            alt="image"
            width={105}
            height={42}
          />
        </Link>
      </NextLink>
      <NextLink href="/favorites" passHref>
        <Link css={{ marginLeft: 'auto' }}>
          <Text
            color="white"
            css={{
              textGradient: '45deg, $yellow500 -20%, $red500 100%',
            }}
          >
            Favoritos
          </Text>
        </Link>
      </NextLink>
    </div>
  );
};
