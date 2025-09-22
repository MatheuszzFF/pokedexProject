import React from 'react';
import styled from 'styled-components';
import { SearchBox } from './SearchBox';

const SidebarContainer = styled.aside`
  width: 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  height: fit-content;
  position: sticky;
  top: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    position: static;
    margin-bottom: 20px;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  h1 {
    margin-top: 15px;
    color: #333;
    font-size: 24px;
    font-weight: 700;
  }
`;

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onResetSearch: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchTerm,
  onSearchChange,
  onResetSearch
}) => {
  return (
    <SidebarContainer>
      <Logo>
        <img src="/assets/images/logo.png" alt="Pokédex Logo" />
        <h1>Pokédex</h1>
      </Logo>
      
      <SearchBox
        value={searchTerm}
        onChange={onSearchChange}
        onReset={onResetSearch}
      />
    </SidebarContainer>
  );
};