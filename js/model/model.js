import { loading } from "../controller/controller.js";

export async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function returnEachPokemonData(url, resultArray) {
    let pokemonPromises = [];
    if(url) {
        const pokeApiReturn = await fetchPokemonData(url);
        const allPokemonsData = pokeApiReturn.results;
        const nextUrl = pokeApiReturn.next;

        pokemonPromises =  allPokemonsData.map(async (pokemon) => {
            return await fetchPokemonData(pokemon.url);
        })

        return {
            pokemons : await Promise.all(pokemonPromises), 
            nextUrl
        }
    }
    
    if(resultArray) {
        pokemonPromises = resultArray.map( async(pokemon) => {
            return await fetchPokemonData(pokemon.url);
        })

        const pokemons = await Promise.all(pokemonPromises);
        return pokemons;
    } 
    
}

const returnAllPokemonsResults = async () => {
    const response = await fetchPokemonData('https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0');
    return response.results
}

export const fillDatalistPokemonNames = async () => {
    const pokemonResponse = await returnAllPokemonsResults();
    const dataList = document.querySelector('#pokemonNames');
    for(const pokemon in pokemonResponse) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', pokemonResponse[pokemon].name);
        dataList.appendChild(optionElement);
    }
}

const allPokemonsResults = await returnAllPokemonsResults();

export const filterPokemonData = (
    removeAllPokemonsCallback, 
    hideLoadMorePokemonsBtn, 
    renderPokemonCard
    ) => {
    const input = document.querySelector('input#searchPokemon');
    let lastArrayFound;
    input.addEventListener('keyup', async (e) => {
        if(e.target.value.length > 2) {
            let fetchPokemonsArray = [];
            loading(true);
            
            for (const pokemonResult in allPokemonsResults) {
                const pokemon = allPokemonsResults[pokemonResult];
                if(pokemon.name.includes(e.target.value.toLowerCase())) {
                    fetchPokemonsArray.push(pokemon);
                }
            }
            
            if(JSON.stringify(lastArrayFound) == JSON.stringify(fetchPokemonsArray)) {
                loading(false, true);
                return;
            }

            removeAllPokemonsCallback();
            const pokemonsToShow = await returnEachPokemonData(null, fetchPokemonsArray);
            pokemonsToShow.forEach(pokemon => {
                renderPokemonCard(pokemon);
            })

            loading(false);
            hideLoadMorePokemonsBtn();
            lastArrayFound = fetchPokemonsArray;
        }
    })
}
