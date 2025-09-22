export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  back_default: string | null;
  other: {
    home: {
      front_default: string | null;
    };
  };
  versions: {
    'generation-vi': {
      'x-y': {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface ProcessedPokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
  experience: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonContextType {
  pokemons: ProcessedPokemon[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchTerm: string;
  filteredPokemons: ProcessedPokemon[];
  loadMore: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  resetSearch: () => void;
}

export type PokemonTypeNames = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic'
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';