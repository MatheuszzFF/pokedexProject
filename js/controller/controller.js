import { returnEachPokemonData, fillDatalistPokemonNames, filterPokemonData } from "../model/model.js";
import { renderPokemonCard, loadMorePokemonsListener, setLoading, removeAllPokemonsElements, hideLoadMorePokemonsBtn } from "../view/view.js";

export const organizePokemonInfo = (pokemon) => {
    let image = pokemon.sprites.other.home.front_default ? 
    pokemon.sprites.other.home.front_default 
    : pokemon.sprites.versions['generation-vi']['x-y'].front_default;
    const pokeNameFirstLetter = pokemon.name.substring(0,1).toUpperCase();
    const name = pokeNameFirstLetter + pokemon.name.substring(1);
    const stats = {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        spAttack: pokemon.stats[3].base_stat,
        spDefense: pokemon.stats[4].base_stat,
    }
    
    return {
        name,
        types: pokemon.types,
        id: pokemon.id,
        image,
        weight: pokemon.weight,
        height: pokemon.height,
        experience: pokemon.base_experience,
        stats
    }
}

export const loading = (boolean) => {
    return setLoading(boolean);
}

export const init = async () => {
    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0';
    setLoading(true)
    let {pokemons, nextUrl } = await returnEachPokemonData(pokemonUrl, true);
    const showPokemons = (pokemons) => {
        pokemons.forEach(pokemon => {
            renderPokemonCard(pokemon)
        }) 
    }

    const returnMorePokemons = () => {
        loadMorePokemonsListener(async () =>  {
            setLoading(true)
            let {pokemons, nextUrl } = await returnEachPokemonData(pokemonUrl, true);
            showPokemons(pokemons)
            pokemonUrl = nextUrl;
            setLoading(false)
        });
    }

    showPokemons(pokemons);
    returnMorePokemons();
    setLoading(false)
    fillDatalistPokemonNames();
    filterPokemonData(removeAllPokemonsElements, hideLoadMorePokemonsBtn, renderPokemonCard);
    
    pokemonUrl = nextUrl;
}
