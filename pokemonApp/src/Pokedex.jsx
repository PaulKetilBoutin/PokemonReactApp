import { Pokemon } from "./Pokemon"
import Button from '@mui/material/Button';
import { Box, Paper, Card, CardContent, CardActions, Typography } from "@mui/material";

export function Pokedex({pokedex, removePokemonFromPokedex}){
    return (
        
        <Box sx={{display: "flex", flexDirection:"row"}}>
        <ul>
            {pokedex.length == 0 && "No pokemons"}
                        {pokedex.map( (pokemon) => {
                            return (
                                <Card sx={{ gap:"2"}}>
                                <CardContent>
                                <li key={pokemon.name+crypto.randomUUID()}>
                                        <Typography variant="h5">{pokemon.name}</Typography>
                                                <Pokemon poke={pokemon.name} pokedex={true} />
                                </li>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" onClick={() => removePokemonFromPokedex(pokemon)}>Remove me !</Button>
                                </CardActions>
                                </Card>
                            )
                        }
                        )}
        </ul>
        </Box>
    )
}