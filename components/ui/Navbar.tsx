import Image from 'next/image';
import NextLink from 'next/link';

import { Link, Text, useTheme } from '@nextui-org/react';

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        padding: `0 ${theme?.space[10].value}`,
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png`}
        alt="image"
        width={70}
        height={70}
      />
      <NextLink href="/" passHref>
        <Link>
          <Image
            src={`/images/pokeapi.png`}
            alt="image"
            width={105}
            height={42}
          />
        </Link>
      </NextLink>
      {/* <Text color="white" h2>
        P
      </Text>
      <Text color="white" h3>
        okémon
      </Text> */}
      <NextLink href="/favorites" passHref>
        <Link css={{ marginLeft: 'auto' }}>
          <Text
            color="white"
            css={{
              textGradient: '45deg, $yellow500 -20%, $red500 100%',
            }}
            // weight="bold"
          >
            Favoritos
          </Text>
        </Link>
      </NextLink>
    </div>
  );
};
