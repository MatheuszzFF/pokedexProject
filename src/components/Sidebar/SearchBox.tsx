import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e1e8ed;
  border-radius: 25px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
`;

const SearchHint = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onReset
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    onReset();
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={handleInputChange}
        aria-label="Search for Pokémon"
      />
      
      {value ? (
        <ClearButton
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ×
        </ClearButton>
      ) : (
        <SearchIcon aria-hidden="true">
          🔍
        </SearchIcon>
      )}
      
      <SearchHint>
        Type at least 3 characters to search
      </SearchHint>
    </SearchContainer>
  );
};