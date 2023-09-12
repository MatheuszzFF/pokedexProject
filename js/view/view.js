import { organizePokemonInfo } from '../controller/controller.js';

const loadMorePokemonsBtn = document.getElementById('loadingMorePokemons');
const modal = document.querySelector('.pokemonModal');

const renderPokemonCardTypes = function (pokemon) {
    return `
        <ul class="pokemon-types-card">
            ${pokemon.types.map(({type}) => {
                return `
                    <li class="type-icon ${type.name}">
                        <img src="/assets/images/pokemon/types/icons/${type.name}.svg">
                        <span class="tooltip">${type.name.substring(0,1).toUpperCase() + type.name.substring(1)} </span>
                    </li>
                `
            }).join('')}
        </ul>
    `
}



const fillPokemonModal = (pokemon) => {
    let image_el = modal.querySelector('.js-modalImage');
    let name_el = modal.querySelector('.js-modalName');
    let id_el = modal.querySelector('.js-modalId');
    let types_el = modal.querySelector('.js-modalTypes');
    let infos_el = modal.querySelector('.js-modalInfos');
    let stats_el = modal.querySelector('js-modalStats');
    console.log(id_el);

    image_el.src = pokemon.image;
    name_el.innerText = pokemon.name;
    id_el.innerText = `#${pokemon.id}`;
    types_el.innerHTML = renderPokemonCardTypes(pokemon);
}

const showPokemonModal = (pokemon) =>  {
    fillPokemonModal(pokemon);
    modal.classList.add('show');
}

export const renderPokemonCard = (pokemon) => {
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
            ${renderPokemonCardTypes(pokemon)}
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
    pokeDiv.addEventListener('click', () => {
        showPokemonModal(pokemon);
    })
}

const addTypeClass = (type, element) => element.classList.add(type);

export const loadMorePokemonsListener = (callback) => {
    loadMorePokemonsBtn.addEventListener('click', callback)
}

export const setLoading = (boolean, hideBtn) => { 
    const loadingIcon = document.querySelector('#loadingIcon');  

    if(boolean) {
        loadMorePokemonsBtn.classList.add('hide');
        loadingIcon.classList.add('show');
    }  else {
        loadMorePokemonsBtn.classList.remove('hide');
        loadingIcon.classList.remove('show');
    }

    if(hideBtn) {
        loadMorePokemonsBtn.classList.add('hide');
    }
}

export const hideLoadMorePokemonsBtn = () => {
    loadMorePokemonsBtn.classList.add('hide');
}

export const removeAllPokemonsElements = () => {
    const allPokemons = document.querySelectorAll('.pokemon__card');
    allPokemons.forEach(element => element.remove());
}