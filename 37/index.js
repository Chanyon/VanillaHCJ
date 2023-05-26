"use strict";
const $ = (v,el=document) => el.querySelector(v);
const $$ = (v,el=document) => el.querySelectorAll(v);

const container = $("#pokedex-container");
const fetchTimes = 150;
const colors = {
    fire: '#fdfdff',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const  key_type = Object.keys(colors);

function randomColor(){
    let key = key_type[Math.floor(Math.random() * key_type.length)];
    return colors[key];
}

async function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id+1}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemon(data);
}

function createPokemon(pokemonData){
    const pokemonItem = document.createElement('div');
    pokemonItem.classList.add('pokedex');
    const name = pokemonData.name.slice(0,1).toUpperCase() + pokemonData.name.slice(1).toLowerCase();
    const id = pokemonData.id.toString().padStart(3,'0');
    const poke_types = pokemonData.types.map(type => type.type.name);
    const type = key_type.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonItem.style.background = `linear-gradient(135deg,${color} 10%,${randomColor()} 100%)`;
    pokemonItem.innerHTML = `
        <div class="pokedex-avatar">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type:<span>${type}</span></small>
        </div>
    `;
    container.appendChild(pokemonItem);
}

async function fetchPokemon(){
    for (let i = 0; i < fetchTimes; i++) {
        await getPokemon(i);
    }
}

window.onload = () => {
    fetchPokemon();
}