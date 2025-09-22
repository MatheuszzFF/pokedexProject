import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ProcessedPokemon } from '@/types';
import { getPrimaryType, formatPokemonId, formatWeight, formatHeight } from '@/utils/pokemonUtils';
import { PokemonTypes } from '../PokemonCard/PokemonTypes';
import { PokemonStats } from './PokemonStats';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 20px;
`;

const ModalContent = styled.div<{ primaryType: string; isOpen: boolean }>`
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  position: relative;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    max-height: 85vh;
  }
`;

const LeftSection = styled.div<{ primaryType: string }>`
  background: ${props => getTypeGradient(props.primaryType)};
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const PokemonName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PokemonId = styled.span`
  font-size: 18px;
  color: #666;
  font-weight: 600;
`;

const TypesContainer = styled.div`
  margin: 20px 0;
  
  h3 {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  text-align: center;

  h4 {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
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

interface PokemonModalProps {
  pokemon: ProcessedPokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!pokemon) return null;

  const primaryType = getPrimaryType(pokemon);

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-name"
    >
      <ModalContent primaryType={primaryType} isOpen={isOpen}>
        <CloseButton
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </CloseButton>

        <LeftSection primaryType={primaryType}>
          <PokemonImage
            src={pokemon.image}
            alt={pokemon.name}
          />
        </LeftSection>

        <RightSection>
          <Header>
            <PokemonName id="pokemon-name">{pokemon.name}</PokemonName>
            <PokemonId>{formatPokemonId(pokemon.id)}</PokemonId>
          </Header>

          <TypesContainer>
            <h3>Types</h3>
            <PokemonTypes types={pokemon.types} />
          </TypesContainer>

          <InfoGrid>
            <InfoCard>
              <h4>Height</h4>
              <p>{formatHeight(pokemon.height)}</p>
            </InfoCard>
            <InfoCard>
              <h4>Weight</h4>
              <p>{formatWeight(pokemon.weight)}</p>
            </InfoCard>
            <InfoCard>
              <h4>Experience</h4>
              <p>{pokemon.experience}</p>
            </InfoCard>
            <InfoCard>
              <h4>ID</h4>
              <p>{pokemon.id}</p>
            </InfoCard>
          </InfoGrid>

          <PokemonStats stats={pokemon.stats} primaryType={primaryType} />
        </RightSection>
      </ModalContent>
    </ModalOverlay>
  );
};