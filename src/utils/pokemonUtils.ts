import { PokemonApiResponse, ProcessedPokemon } from '@/types';

export const processPokemonData = (pokemon: PokemonApiResponse): ProcessedPokemon => {
  const image = 
    pokemon.sprites.other.home.front_default ||
    pokemon.sprites.versions['generation-vi']['x-y'].front_default ||
    pokemon.sprites.front_default ||
    '';

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return {
    id: pokemon.id,
    name: capitalizedName,
    image,
    types: pokemon.types,
    height: pokemon.height,
    weight: pokemon.weight,
    experience: pokemon.base_experience,
    stats: {
      hp: pokemon.stats[0]?.base_stat || 0,
      attack: pokemon.stats[1]?.base_stat || 0,
      defense: pokemon.stats[2]?.base_stat || 0,
      spAttack: pokemon.stats[3]?.base_stat || 0,
      spDefense: pokemon.stats[4]?.base_stat || 0,
    }
  };
};

export const getPrimaryType = (pokemon: ProcessedPokemon): string => {
  return pokemon.types[0]?.type.name || 'normal';
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};

export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

export const getTypeIcon = (typeName: string): string => {
  return `/assets/images/pokemon/types/icons/${typeName}.svg`;
};

export const getTypeBackground = (typeName: string): string => {
  return `/assets/images/pokemon/types/background/background-${typeName}.svg`;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};