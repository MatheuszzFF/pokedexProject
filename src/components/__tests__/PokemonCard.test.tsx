import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { ProcessedPokemon } from '@/types';

const mockPokemon: ProcessedPokemon = {
  id: 1,
  name: 'Bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  types: [
    {
      slot: 1,
      type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' }
    },
    {
      slot: 2,
      type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
    }
  ],
  height: 7,
  weight: 69,
  experience: 64,
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    spAttack: 65,
    spDefense: 65,
  }
};

describe('PokemonCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders pokemon information correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('calls onClick when Enter key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    
    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('calls onClick when Space key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });
    
    expect(mockOnClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('has proper accessibility attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', 'View details for Bulbasaur');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});