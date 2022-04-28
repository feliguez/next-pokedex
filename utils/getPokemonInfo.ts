import { Pokemon } from '../interfaces';
import { pokeApi } from '../pages/api';

export const getPokemonInfo = async (nameOrId: string) => {
  const response = await fetch(`${pokeApi}/pokemon/${nameOrId}`);

  const { id, name, sprites, ...rest }: Pokemon = await response.json();

  return { id, name, sprites };
};
