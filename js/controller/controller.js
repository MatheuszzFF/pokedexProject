import { returnEachPokemonData } from "../model/model.js";
import { renderPokemon, loadMorePokemonsListener } from "../view/view.js";

export const organizePokemonInfo = (pokemon) => {
    let image = pokemon.sprites.other.home.front_default ? 
    pokemon.sprites.other.home.front_default 
    : pokemon.sprites.versions['generation-vi']['x-y'].front_default;
    let pokeNameFirstLetter = pokemon.name.substring(0,1).toUpperCase();
    let name = pokeNameFirstLetter + pokemon.name.substring(1);
    return {
        name,
        types: pokemon.types,
        id: pokemon.id,
        image,
    }
}


export const init = async () => {
    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0';
    let {pokemons, nextUrl } = await returnEachPokemonData(pokemonUrl);
    const showPokemons = (pokemons) => {
        pokemons.forEach(pokemon => {
            renderPokemon(pokemon)
        }) 
    }

    const returnMorePokemons = () => {
        loadMorePokemonsListener(async () =>  {
            let {pokemons, nextUrl } = await returnEachPokemonData(pokemonUrl);
            showPokemons(pokemons)
            pokemonUrl = nextUrl;
        });
    }

    showPokemons(pokemons);
    returnMorePokemons();
    
    pokemonUrl = nextUrl;
}
