import { useState, useCallback } from 'react';
import { ProcessedPokemon } from '@/types';

interface UsePokemonModalReturn {
  selectedPokemon: ProcessedPokemon | null;
  isModalOpen: boolean;
  openModal: (pokemon: ProcessedPokemon) => void;
  closeModal: () => void;
}

export const usePokemonModal = (): UsePokemonModalReturn => {
  const [selectedPokemon, setSelectedPokemon] = useState<ProcessedPokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((pokemon: ProcessedPokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  }, []);

  return {
    selectedPokemon,
    isModalOpen,
    openModal,
    closeModal,
  };
};