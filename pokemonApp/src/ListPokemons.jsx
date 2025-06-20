import { Pokemon } from "./Pokemon"
import Button from '@mui/material/Button';


export function ListPokemons({pokemons, addPokemonToPokedex, addMoreInfo}) {

    const addMoreInfoPokemon = (pokemon) => {
        addMoreInfo(pokemon)
    }

    const addTolocalStorage = (pokemon) => {
        const pokemonList = JSON.parse(localStorage.getItem("pokemonList"))
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
                        
                        <Button variant="contained" onClick={() => addPokemonToPokedex(pokemon)}>Add me !</Button>
                    </li>
                )
            }
            )}
        </ul>
    )
}