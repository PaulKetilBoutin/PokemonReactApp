import { Pokemon } from "./Pokemon"
import Button from '@mui/material/Button';


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
                                    <Button variant="contained" onClick={() => removePokemonFromPokedex(pokemon)}>Remove me !</Button>
                                </li>
                            )
                        }
                        )}
        </ul>
    )
}