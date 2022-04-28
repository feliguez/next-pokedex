const toggleFavorites = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((fav) => fav !== id);
  } else {
    favorites = [id, ...favorites];
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const isFavorite = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  const favorites: number[] = JSON.parse(
    localStorage?.getItem('favorites') || '[]'
  );

  return favorites.includes(id);
};

const pokemons = () => {
  return JSON.parse(localStorage?.getItem('favorites') || '[]');
};

export { toggleFavorites, isFavorite, pokemons };
