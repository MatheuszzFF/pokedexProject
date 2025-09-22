import React from 'react';
import styled from 'styled-components';
import { ProcessedPokemon } from '@/types';

const StatsContainer = styled.div`
  h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 600;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
`;

const StatName = styled.span`
  min-width: 80px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatBarContainer = styled.div`
  flex: 1;
  height: 8px;
  background: #e1e8ed;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const StatBar = styled.div<{ value: number; maxValue: number; primaryType: string }>`
  height: 100%;
  background: ${props => getStatColor(props.primaryType)};
  width: ${props => Math.min((props.value / props.maxValue) * 100, 100)}%;
  border-radius: 4px;
  transition: width 0.8s ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 3px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0 4px 4px 0;
  }
`;

const StatValue = styled.span`
  min-width: 35px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: right;
`;

const getStatColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  
  return colors[type] || colors.normal;
};

const getStatDisplayName = (statName: string): string => {
  const displayNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    spAttack: 'Sp. Atk',
    spDefense: 'Sp. Def',
  };
  
  return displayNames[statName] || statName;
};

interface PokemonStatsProps {
  stats: ProcessedPokemon['stats'];
  primaryType: string;
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats, primaryType }) => {
  const maxStatValue = 255; // Maximum possible stat value in Pokemon
  
  const statEntries = Object.entries(stats);

  return (
    <StatsContainer>
      <h3>Base Stats</h3>
      {statEntries.map(([statName, value]) => (
        <StatItem key={statName}>
          <StatName>{getStatDisplayName(statName)}</StatName>
          <StatBarContainer>
            <StatBar
              value={value}
              maxValue={maxStatValue}
              primaryType={primaryType}
            />
          </StatBarContainer>
          <StatValue>{value}</StatValue>
        </StatItem>
      ))}
    </StatsContainer>
  );
};