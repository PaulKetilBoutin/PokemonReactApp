import { useState } from "react"
import { useEffect } from "react"
import Button from '@mui/material/Button';
import { Box, Typography } from "@mui/material";


export function Pokemon({poke, addMoreInfoPokemon, pokedex=false}) {
const [info, setInfo] = useState({})

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + poke
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setInfo(json)
        })
        .catch(error => console.error('Error fetching data:', error))
    },[])
    
    return (
        <Box>
            {info.length == 0 && "No Info"}
            {info.sprites ? <img src={info.sprites.front_default}/>: null}
            {!pokedex && 
            <Button variant="outlined" onClick={() => {
                addMoreInfoPokemon(info)}
            }>More info !</Button>
            }
        </Box>
    )
}