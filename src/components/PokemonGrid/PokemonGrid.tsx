import React from 'react';
import styled from 'styled-components';
import { ProcessedPokemon } from '@/types';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { LoadingSpinner, ErrorMessage, Button } from '../styles/GlobalStyles';
import { useInfiniteScroll } from '@/hooks';

const GridContainer = styled.div`
  flex: 1;
  padding: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  gap: 20px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.8);
  
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    opacity: 0.8;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100px;
`;

interface PokemonGridProps {
  pokemons: ProcessedPokemon[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onPokemonClick: (pokemon: ProcessedPokemon) => void;
  isSearching?: boolean;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  loading,
  error,
  hasMore,
  onLoadMore,
  onPokemonClick,
  isSearching = false
}) => {
  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasMore: hasMore && !isSearching,
    onLoadMore,
    threshold: 0.1
  });

  if (error) {
    return (
      <GridContainer>
        <ErrorMessage>
          <strong>Oops! Something went wrong</strong>
          <br />
          {error}
        </ErrorMessage>
      </GridContainer>
    );
  }

  if (pokemons.length === 0 && !loading) {
    return (
      <GridContainer>
        <NoResults>
          <h3>No Pokémon found</h3>
          <p>Try searching with different keywords</p>
        </NoResults>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <Grid>
        {pokemons.map((pokemon, index) => (
          <div
            key={`${pokemon.id}-${index}`}
            ref={index === pokemons.length - 1 ? lastElementRef : null}
          >
            <PokemonCard
              pokemon={pokemon}
              onClick={onPokemonClick}
            />
          </div>
        ))}
      </Grid>

      {loading && (
        <LoadingIndicator>
          <LoadingSpinner />
        </LoadingIndicator>
      )}

      {!isSearching && hasMore && !loading && (
        <LoadMoreContainer>
          <Button onClick={onLoadMore}>
            Load More Pokémon
          </Button>
        </LoadMoreContainer>
      )}
    </GridContainer>
  );
};