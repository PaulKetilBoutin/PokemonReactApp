import { Pokemon } from "./Pokemon"

export function ListPokemons({pokemons}) {
    return (
        <ul>
            {pokemons.length == 0 && "No pokemons"}
            {pokemons.map( (pokemon) => {
                return (
                    <li key={pokemon.name}>
                        <table>
                            <thead><tr><th>{pokemon.name}</th></tr></thead>
                                <tbody>
                                    <Pokemon poke={pokemon.name} />
                                </tbody>
                        </table>
                    </li>
                )
            }
            )}
        </ul>
    )
}