import { Pokemon } from "./Pokemon"

export function ListPokemons({pokemons, addPokemonToPokedex, addMoreInfo}) {

    function addMoreInfoPokemon(pokemon){
        addMoreInfo(pokemon)
    }

    function addTolocalStorage(pokemon){
        const pokemonList = JSON.parse(localStorage.getItem("pokemonList"))
        console.log("ADDING pokemon to localStorage")
        if (pokemonList != null && !pokemonList.includes(pokemon.name)) localStorage.setItem("pokemonList", JSON.stringify([...pokemonList, pokemon.name]))
    }
    return (
        <ul>
            {pokemons.length == 0 && "No pokemons"}
            {pokemons.map( (pokemon) => {
                addTolocalStorage(pokemon)
                return (
                    <li key={pokemon.name}>
                        <table>
                            <thead><tr><th>{pokemon.name}</th></tr></thead>
                                <tbody>
                                    <Pokemon poke={pokemon.name} addMoreInfoPokemon={addMoreInfoPokemon}/>
                                </tbody>
                        </table>
                        
                        <button onClick={() => addPokemonToPokedex(pokemon)}>Add me !</button>
                    </li>
                )
            }
            )}
        </ul>
    )
}