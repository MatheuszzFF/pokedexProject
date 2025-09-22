import { useContext } from 'react';
import { PokemonContext } from '@/context/PokemonContext';
import { PokemonContextType } from '@/types';

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};