import { Pokemon } from "./Pokemon"

export function ListPokemons({pokemons, addPokemonToPokedex, addMoreInfo}) {
    return (
        <ul>
            {pokemons.length == 0 && "No pokemons"}
            {pokemons.map( (pokemon) => {
                return (
                    <li key={pokemon.name}>
                        <table>
                            <thead><tr><th>{pokemon.name}</th></tr></thead>
                                <tbody>
                                    <Pokemon poke={pokemon.name} addMoreInfo={addMoreInfo}/>
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