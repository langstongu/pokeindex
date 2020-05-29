"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.getElementById("app");
const pokemons = 100;
//The function fetchData allows us 
//to loop through the number of pokemon to retrieve and for each object call getPokemon with the pokemon number.
const fetchData = () => {
    for (let i = 1; i < pokemons; i++) {
        getPokemon(i);
    }
};
//It may take time to fetch data, so we'll use an asynchronous function that returns a Promise of type void. 
//This last means that the function won't return a value.
const getPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();
    const pokemonType = pokemon.types
        .map((poke) => poke.type.name)
        .join(", ");
    //And once the data fetched, we can now create a new object transformedPokemon that mirrors the interface IPokemon,
    // and then pass it as an argument to showPokemon().
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    };
    //the function showPokemon receives as a parameter the pokemon object of type IPokemon and returns void or no value to be precise
    showPokemon(transformedPokemon);
});
const showPokemon = (pokemon) => {
    let output = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;
    container.innerHTML += output; //It will just append the content to the HTML file with the help of the id container (remember, it's the div tag).
};
fetchData();
