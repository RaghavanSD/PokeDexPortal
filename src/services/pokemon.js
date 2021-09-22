//for the first page api call
export function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                resolve(data)
            })
    });
}

export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                resolve(data)
            })
    });
}

///for the second page api call (detail page)
const baseUrl = 'http://pokeapi.co/api/v2';
const query = {
    pokemon: 'pokemon'
  }
  
  export async function fetchPokemon(pokemon) {
    console.log(`${baseUrl}/${query.pokemon}/${pokemon}`);
    return fetch(`${baseUrl}/${query.pokemon}/${pokemon}`,{mode: 'cors'})
  }