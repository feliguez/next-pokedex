import { useEffect, useState } from 'react';

import { MainLayout } from '../../components/layout';
import { Favorites } from '../../components/ui/Favorites';

import { localFavorites } from '../../utils';

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <MainLayout title="Pokémons - Favoritos">
      <Favorites pokemons={favoritePokemons} />
    </MainLayout>
  );
};

export default FavoritesPage;
