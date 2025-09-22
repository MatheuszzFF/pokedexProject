import { PokemonApiResponse, PokemonListResponse, ApiError } from '@/types';

const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_PER_PAGE = 21;

class PokemonApiService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: error instanceof Error && 'status' in error ? (error as Error & { status?: number }).status : undefined
      };
      throw apiError;
    }
  }

  async getPokemonList(offset: number = 0): Promise<PokemonListResponse> {
    const url = `${BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`;
    return this.fetchWithErrorHandling<PokemonListResponse>(url);
  }

  async getPokemonDetails(url: string): Promise<PokemonApiResponse> {
    return this.fetchWithErrorHandling<PokemonApiResponse>(url);
  }

  async getAllPokemonNames(): Promise<PokemonListResponse> {
    const url = `${BASE_URL}/pokemon?limit=10000&offset=0`;
    return this.fetchWithErrorHandling<PokemonListResponse>(url);
  }

  async searchPokemon(query: string): Promise<PokemonApiResponse[]> {
    const allPokemon = await this.getAllPokemonNames();
    const filteredPokemon = allPokemon.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    const pokemonPromises = filteredPokemon.slice(0, 50).map(pokemon =>
      this.getPokemonDetails(pokemon.url)
    );

    return await Promise.all(pokemonPromises);
  }

  async getPokemonBatch(pokemonUrls: string[]): Promise<PokemonApiResponse[]> {
    const pokemonPromises = pokemonUrls.map(url => this.getPokemonDetails(url));
    return await Promise.all(pokemonPromises);
  }
}

export const pokemonApiService = new PokemonApiService();