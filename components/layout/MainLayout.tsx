import { useTheme } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

import { Navbar } from '../ui';

interface Props {
  title?: string;
  children?: ReactNode;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const MainLayout: FC<Props> = ({ children, title }) => {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Felipe Rodríguez" />
        <meta name="description" content="Pokedex" />
        <meta name="keywords" content="pokemon, pokedex" />

        <meta property="og:title" content={`Info about ${title}`} />
        <meta property="og:description" content={`Page about ${title}`} />
        <meta property="og:image" content={`${origin}/images/banner.png`} />
      </Head>

      <Navbar />

      <main style={{ padding: `0 ${theme?.space[10].value}` }}>{children}</main>
    </>
  );
};
