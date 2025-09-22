import React, { memo } from 'react';
import styled from 'styled-components';
import { ProcessedPokemon } from '@/types';
import { getPrimaryType, formatPokemonId } from '@/utils/pokemonUtils';
import { PokemonTypes } from './PokemonTypes';

const CardContainer = styled.div<{ primaryType: string }>`
  background: ${props => getTypeGradient(props.primaryType)};
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20px;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 0;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
`;

const PokemonId = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 14px;
`;

const ImageContainer = styled.div`
  position: relative;
  text-align: center;
  margin: 20px 0;
  z-index: 1;
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
`;

const ShadowImage = styled.img`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  object-fit: contain;
  opacity: 0.3;
  filter: blur(8px) brightness(0);
  z-index: 1;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const PokemonName = styled.h3`
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const getTypeGradient = (type: string): string => {
  const gradients: Record<string, string> = {
    normal: 'linear-gradient(135deg, #A8A878 0%, #C6C6A7 100%)',
    fire: 'linear-gradient(135deg, #F08030 0%, #F5AC78 100%)',
    water: 'linear-gradient(135deg, #6890F0 0%, #9DB7F5 100%)',
    electric: 'linear-gradient(135deg, #F8D030 0%, #FAE078 100%)',
    grass: 'linear-gradient(135deg, #78C850 0%, #A7DB8D 100%)',
    ice: 'linear-gradient(135deg, #98D8D8 0%, #BCE6E6 100%)',
    fighting: 'linear-gradient(135deg, #C03028 0%, #D67873 100%)',
    poison: 'linear-gradient(135deg, #A040A0 0%, #C183C1 100%)',
    ground: 'linear-gradient(135deg, #E0C068 0%, #EBD69D 100%)',
    flying: 'linear-gradient(135deg, #A890F0 0%, #C6B7F5 100%)',
    psychic: 'linear-gradient(135deg, #F85888 0%, #FA92B2 100%)',
    bug: 'linear-gradient(135deg, #A8B820 0%, #C6D16E 100%)',
    rock: 'linear-gradient(135deg, #B8A038 0%, #D1C17D 100%)',
    ghost: 'linear-gradient(135deg, #705898 0%, #A292BC 100%)',
    dragon: 'linear-gradient(135deg, #7038F8 0%, #A183FA 100%)',
    dark: 'linear-gradient(135deg, #705848 0%, #A29288 100%)',
    steel: 'linear-gradient(135deg, #B8B8D0 0%, #D1D1E0 100%)',
    fairy: 'linear-gradient(135deg, #EE99AC 0%, #F4BDC9 100%)',
  };
  
  return gradients[type] || gradients.normal;
};

interface PokemonCardProps {
  pokemon: ProcessedPokemon;
  onClick: (pokemon: ProcessedPokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = memo(({ pokemon, onClick }) => {
  const primaryType = getPrimaryType(pokemon);
  
  const handleClick = () => {
    onClick(pokemon);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(pokemon);
    }
  };

  return (
    <CardContainer
      primaryType={primaryType}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${pokemon.name}`}
    >
      <CardHeader>
        <PokemonId>{formatPokemonId(pokemon.id)}</PokemonId>
        <PokemonTypes types={pokemon.types} />
      </CardHeader>
      
      <ImageContainer>
        <ShadowImage src={pokemon.image} alt="" aria-hidden="true" />
        <PokemonImage 
          src={pokemon.image} 
          alt={pokemon.name}
          loading="lazy"
        />
      </ImageContainer>
      
      <CardContent>
        <PokemonName>{pokemon.name}</PokemonName>
      </CardContent>
    </CardContainer>
  );
});

PokemonCard.displayName = 'PokemonCard';