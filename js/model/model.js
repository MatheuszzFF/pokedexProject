async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function returnEachPokemonData(url) {
    const pokeApiReturn = await fetchPokemonData(url);
    const allPokemonsData = pokeApiReturn.results;
    const nextUrl = pokeApiReturn.next;
    
    const pokemonPromises =  allPokemonsData.map(async (pokemon) => {
        return await fetchPokemonData(pokemon.url);
    })

    return {
        pokemons : await Promise.all(pokemonPromises), 
        nextUrl
    }
}


