import { Pokemon } from '../interfaces';
import { pokeApi } from '../pages/api';

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const response = await fetch(`${pokeApi}/pokemon/${nameOrId}`);

    const { id, name, sprites, ...rest }: Pokemon = await response.json();

    return { id, name, sprites };
  } catch (error) {
    return null;
  }
};

export const pokemonSvg = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
