import { useState } from "react"
import { useEffect } from "react"

export function Pokemon({poke, addMoreInfoPokemon}) {
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
            <td><button onClick={() => addMoreInfoPokemon(info)}>More info !</button></td>
        </tr>
    )
}