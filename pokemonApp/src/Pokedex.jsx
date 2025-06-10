import { Pokemon } from "./Pokemon"

export function Pokedex({pokedex, removePokemonFromPokedex}){
    return (
        <ul>
            {pokedex.length == 0 && "No pokemons"}
                        {pokedex.map( (pokemon) => {
                            return (
                                <li key={pokemon.name+crypto.randomUUID()}>
                                    <table>
                                        <thead><tr><th>{pokemon.name}</th></tr></thead>
                                            <tbody>
                                                <Pokemon poke={pokemon.name} pokedex={true} />
                                            </tbody>
                                    </table>
                                    <button onClick={() => removePokemonFromPokedex(pokemon)}>Remove me !</button>
                                </li>
                            )
                        }
                        )}
        </ul>
    )
}