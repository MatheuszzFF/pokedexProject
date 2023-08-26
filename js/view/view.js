import { organizePokemonInfo } from '../controller/controller.js';

export const renderPokemon = (pokemon) => {
    pokemon = organizePokemonInfo(pokemon);
    const pokeContainer = document.querySelector('#pokemonContainer');
    const pokeDiv = document.createElement('div');
    pokeDiv.classList.add('pokemon__card');
    pokemon.types.forEach(({type}, index) => {
        index == 0 && addTypeClass(type.name, pokeDiv)
    })
    pokeDiv.innerHTML = `
        <div class="top">
            <span>#${pokemon.id}</span>
            <ul class="pokemon-types-card">
                ${pokemon.types.map(({type}) => {
                    return `
                    <li class="type-icon ${type.name}">
                        <img src="/assets/images/pokemon/types/icons/${type.name}.svg">
                        <span class="tooltip">${type.name.substring(0,1).toUpperCase() + type.name.substring(1)} </span>
                    </li>`
                }).join('')}
            </ul>   
        </div>
        <div class="radiusImage">
            <img src="${pokemon.image}"/>
            <img class="shadow" src="${pokemon.image}"/>
        </div>
        <div class="content">
            <h4>${pokemon.name}</h4>
        </div>
    `;
    pokeContainer.appendChild(pokeDiv);
}

const addTypeClass = (type, element) => element.classList.add(type);

export const loadMorePokemonsListener = (callback) => {
    const loadMorePokemonsBtn = document.getElementById('loadingMorePokemons');
    loadMorePokemonsBtn.addEventListener('click', callback)
}