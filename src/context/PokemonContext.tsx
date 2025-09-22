import React, { createContext, useReducer, useCallback, ReactNode } from 'react';
import { ProcessedPokemon, PokemonContextType, ApiError } from '@/types';
import { pokemonApiService } from '@/services/pokemonApi';
import { processPokemonData, debounce } from '@/utils/pokemonUtils';

interface PokemonState {
  pokemons: ProcessedPokemon[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchTerm: string;
  filteredPokemons: ProcessedPokemon[];
  offset: number;
  isSearching: boolean;
}

type PokemonAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POKEMONS'; payload: ProcessedPokemon[] }
  | { type: 'ADD_POKEMONS'; payload: ProcessedPokemon[] }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTERED_POKEMONS'; payload: ProcessedPokemon[] }
  | { type: 'SET_OFFSET'; payload: number }
  | { type: 'SET_IS_SEARCHING'; payload: boolean }
  | { type: 'RESET_SEARCH' };

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
  hasMore: true,
  searchTerm: '',
  filteredPokemons: [],
  offset: 0,
  isSearching: false,
};

const pokemonReducer = (state: PokemonState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_POKEMONS':
      return { ...state, pokemons: action.payload };
    case 'ADD_POKEMONS':
      return { ...state, pokemons: [...state.pokemons, ...action.payload] };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_FILTERED_POKEMONS':
      return { ...state, filteredPokemons: action.payload };
    case 'SET_OFFSET':
      return { ...state, offset: action.payload };
    case 'SET_IS_SEARCHING':
      return { ...state, isSearching: action.payload };
    case 'RESET_SEARCH':
      return {
        ...state,
        searchTerm: '',
        filteredPokemons: [],
        isSearching: false,
        error: null,
      };
    default:
      return state;
  }
};

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const loadInitialPokemons = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const pokemonList = await pokemonApiService.getPokemonList(0);
      const pokemonUrls = pokemonList.results.map(pokemon => pokemon.url);
      const pokemonDetails = await pokemonApiService.getPokemonBatch(pokemonUrls);
      
      const processedPokemons = pokemonDetails.map(processPokemonData);
      
      dispatch({ type: 'SET_POKEMONS', payload: processedPokemons });
      dispatch({ type: 'SET_OFFSET', payload: 21 });
      dispatch({ type: 'SET_HAS_MORE', payload: !!pokemonList.next });
    } catch (error) {
      const apiError = error as ApiError;
      dispatch({ type: 'SET_ERROR', payload: apiError.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore || state.isSearching) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const pokemonList = await pokemonApiService.getPokemonList(state.offset);
      const pokemonUrls = pokemonList.results.map(pokemon => pokemon.url);
      const pokemonDetails = await pokemonApiService.getPokemonBatch(pokemonUrls);
      
      const processedPokemons = pokemonDetails.map(processPokemonData);
      
      dispatch({ type: 'ADD_POKEMONS', payload: processedPokemons });
      dispatch({ type: 'SET_OFFSET', payload: state.offset + 21 });
      dispatch({ type: 'SET_HAS_MORE', payload: !!pokemonList.next });
    } catch (error) {
      const apiError = error as ApiError;
      dispatch({ type: 'SET_ERROR', payload: apiError.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.loading, state.hasMore, state.offset, state.isSearching]);

  const searchPokemons = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      dispatch({ type: 'RESET_SEARCH' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_IS_SEARCHING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const searchResults = await pokemonApiService.searchPokemon(searchTerm);
      const processedPokemons = searchResults.map(processPokemonData);
      
      dispatch({ type: 'SET_FILTERED_POKEMONS', payload: processedPokemons });
    } catch (error) {
      const apiError = error as ApiError;
      dispatch({ type: 'SET_ERROR', payload: apiError.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const debouncedSearch = useCallback(
    (term: string) => {
      const debouncedFn = debounce(searchPokemons, 300);
      debouncedFn(term);
    },
    [searchPokemons]
  );

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    debouncedSearch(term);
  }, [debouncedSearch]);

  const resetSearch = useCallback(() => {
    dispatch({ type: 'RESET_SEARCH' });
  }, []);

  // Load initial pokemons on mount
  React.useEffect(() => {
    loadInitialPokemons();
  }, [loadInitialPokemons]);

  const contextValue: PokemonContextType = {
    pokemons: state.pokemons,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    searchTerm: state.searchTerm,
    filteredPokemons: state.filteredPokemons,
    loadMore,
    setSearchTerm,
    resetSearch,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};
