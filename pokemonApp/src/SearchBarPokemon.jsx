import { useState, useEffect } from "react"

export function SearchBarPokemon({addPokemons}){
    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")
    const [pokemonsNames, setPokemonsNames] = useState(JSON.parse(localStorage.getItem("pokemonList")))

    if (pokemonsNames === null) {
      localStorage.setItem("pokemonList", JSON.stringify(["pikachu", "bulbasaur"]))
      setPokemonsNames(JSON.parse(localStorage.getItem("pokemonList")))
    }

    useEffect(() => { // refresh the pokemon List from local storage each time a pokemon is added to the list
      setPokemonsNames(JSON.parse(localStorage.getItem("pokemonList")))
    }, [localStorage.getItem('pokemonList')])

    useEffect(() => {
      if (!newItem || newItem === "undefined") return
      fetch("https://pokeapi.co/api/v2/pokemon/"+newItem).then((response) => response.json())
      .then((json) => {
        addPokemons(json)
      })
        .catch(error => console.error('Error fetching data:', error))
      },[search])

    return (
        <form onSubmit={(e) => {
          e.preventDefault()
          setSearch(newItem)
          }}>
            <input list="pokemonSearch" type="text" onChange={(e) => setNewItem(e.target.value)}></input>
            <datalist id="pokemonSearch">
              {pokemonsNames.map((name) => {
                return (<option value={name} key={name}>{name}</option>)
              })}
            </datalist>
            <button>Search</button>
        </form>
    )
}