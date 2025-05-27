import { useState, useEffect } from "react"

export function SearchBarPokemon({addPokemons}){
    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
      console.log(newItem)
      if (!newItem || newItem ==="undefined") return
      fetch("https://pokeapi.co/api/v2/pokemon/"+newItem).then((response) => response.json())
      .then((json) => {
        console.log("NEW ITEM VAL" + newItem)
        console.log("JSON RESULTS" + json)
        console.log(json)
        addPokemons(json)
      })
        .catch(error => console.error('Error fetching data:', error))
      },[search])

    return (
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log("VALUE:"+newItem)
          setSearch(newItem)
          }}>
            <input type="text" onChange={(e) => setNewItem(e.target.value)}></input>
            <button>Search</button>
        </form>
    )
}