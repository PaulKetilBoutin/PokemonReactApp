import { useState, useEffect } from "react"

export function SearchBarPokemon({addPokemons}){
    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+newItem).then((response) => response.json()).then((json) => {
          addPokemons(json.results)
      })
        .catch(error => console.error('Error fetching data:', error))
      },[search])

    return (
        <>
            <input type="text" onChange={(e) => setNewItem(e.target.value)}></input>
            <button onClick={setSearch(newItem)}>Search</button>
        </>
    )
}