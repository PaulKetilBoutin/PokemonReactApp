import { Pokemon } from "./Pokemon";
import  Button  from '@mui/material/Button';
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';


export default function ListPokemons({pokemons, addPokemonToPokedex, addMoreInfo}) {

    const addMoreInfoPokemon = (pokemon) => {
        addMoreInfo(pokemon)
    }

    const addTolocalStorage = (pokemon) => {
        const pokemonList = JSON.parse(localStorage.getItem("pokemonList"))
        if (pokemonList != null && !pokemonList.includes(pokemon.name)) localStorage.setItem("pokemonList", JSON.stringify([...pokemonList, pokemon.name]))
    }
    return (
        <Box sx={{display: "flex", flexDirection:"row", gap:"5"}}>
        <ul>
            {pokemons.length == 0 && "No pokemons"}
            {pokemons.map( (pokemon) => {
                addTolocalStorage(pokemon)
                return (
                    <Card>
                    <CardContent>
                    <li key={pokemon.name}>
                        <Typography variant="h5">{pokemon.name}</Typography>
                        <Pokemon poke={pokemon.name} addMoreInfoPokemon={addMoreInfoPokemon}/>
                    </li>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => addPokemonToPokedex(pokemon)}>Add me !</Button>
                    </CardActions>
                    </Card>
                )
            }
            )}
        </ul>
        </Box>
    )
}