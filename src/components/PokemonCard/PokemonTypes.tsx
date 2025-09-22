import React from 'react';
import styled from 'styled-components';
import { PokemonType } from '@/types';
import { getTypeIcon, capitalizeFirstLetter } from '@/utils/pokemonUtils';

const TypesList = styled.ul`
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TypeItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    
    .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;

const TypeIcon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
`;

const Tooltip = styled.span`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%) translateY(-5px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.8);
  }
`;

interface PokemonTypesProps {
  types: PokemonType[];
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return (
    <TypesList role="list" aria-label="Pokémon types">
      {types.map(({ type }, index) => (
        <TypeItem key={`${type.name}-${index}`} role="listitem">
          <TypeIcon
            src={getTypeIcon(type.name)}
            alt={`${type.name} type`}
            onError={(e) => {
              // Fallback if icon doesn't load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.textContent = type.name.charAt(0).toUpperCase();
            }}
          />
          <Tooltip className="tooltip">
            {capitalizeFirstLetter(type.name)}
          </Tooltip>
        </TypeItem>
      ))}
    </TypesList>
  );
};