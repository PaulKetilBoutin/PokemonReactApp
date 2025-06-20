import { useState } from "react"
import { useEffect } from "react"
import Button from '@mui/material/Button';


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
        
        <tr>
            {info.length == 0 && "No Info"}
            <td>id: {info.id}</td>
            <td>height: {info.height}</td>
            <td>weight: {info.weight}</td>
            <td>{info.sprites ? <img src={info.sprites.front_default}/>: null}</td>
            {!pokedex && 
            <td><Button variant="outlined" onClick={() => {
                addMoreInfoPokemon(info)}
            }>More info !</Button></td>
            }
        </tr>
    )
}