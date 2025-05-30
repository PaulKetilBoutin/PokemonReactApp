import { useState, useEffect } from "react"

export function SearchBarPokemon({addPokemons}){
    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")
    const [pokemonsNames, setPokemonsNames] = useState(localStorage.getItem("pokemonList"))
    if (pokemonsNames === "null") { // DOESNT WORK NEEDS TO BE FIXED
        console.log("IN IF")
        console.log(pokemonsNames)
        setPokemonsNames(["pikachu", "bulbasaur"])
        console.log(pokemonsNames)
        localStorage.setItem("pokemonList", JSON.stringify(pokemonsNames))
    }
    console.log(pokemonsNames)

    useEffect(() => {
      console.log(newItem)
      if (!newItem || newItem === "undefined") return
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
            <input list="pokemonSearch" type="text" onChange={(e) => setNewItem(e.target.value)}></input>
            <datalist id="pokemonSearch">
              {pokemonsNames.map((name) => {
                return (<option value={name}>{name}</option>)
              })}
            </datalist>
            <button>Search</button>
        </form>
    )
}