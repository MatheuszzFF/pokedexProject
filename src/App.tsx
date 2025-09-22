import React from 'react';
import { PokemonProvider } from '@/context/PokemonContext';
import { usePokemonModal, usePokemon } from '@/hooks';
import { GlobalStyles, Container } from '@/components/styles/GlobalStyles';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PokemonGrid } from '@/components/PokemonGrid/PokemonGrid';
import { PokemonModal } from '@/components/PokemonModal/PokemonModal';

const AppContent: React.FC = () => {
  const {
    pokemons,
    loading,
    error,
    hasMore,
    searchTerm,
    filteredPokemons,
    loadMore,
    setSearchTerm,
    resetSearch,
  } = usePokemon();

  const {
    selectedPokemon,
    isModalOpen,
    openModal,
    closeModal,
  } = usePokemonModal();

  const isSearching = searchTerm.length >= 3;
  const displayPokemons = isSearching ? filteredPokemons : pokemons;

  return (
    <>
      <GlobalStyles />
      <Container>
        <Sidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onResetSearch={resetSearch}
        />
        
        <PokemonGrid
          pokemons={displayPokemons}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onPokemonClick={openModal}
          isSearching={isSearching}
        />
      </Container>

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <AppContent />
    </PokemonProvider>
  );
};

export default App;