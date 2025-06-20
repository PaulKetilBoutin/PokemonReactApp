import { useEffect, useState } from 'react'
import './App.css'
import { ListPokemons } from './ListPokemons'
import { SearchBarPokemon } from './SearchBarPokemon'
import { Pokedex } from './Pokedex'
import { MoreInfoPokemon } from './MoreInfoPokemon'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokedex, setPokedex] = useState([])
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [prevUrl, setPrevUrl] = useState(null)
  const [nextUrl, setNextUrl] = useState(null)
  const [moreInfoPokemon, setMoreInfoPokemon] = useState({})
  
  useEffect(() => {
    if (pokedex.length === 0) return 
    localStorage.setItem("pokedex", JSON.stringify(pokedex))
  }, [pokedex]) 

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(url))) { // check if data already in local stroage before fetch
      const res = JSON.parse(localStorage.getItem(url))
      setPokemons(res.results)
      setPrevUrl(res.previous)
      setNextUrl(res.next)
      if (localStorage.getItem("pokedex")) setPokedex(JSON.parse(localStorage.getItem("pokedex")))
    }
    else {
      fetch(url).then((response) => response.json()).then((json) => {
        setPokemons(json.results)
        setPrevUrl(json.previous)
        setNextUrl(json.next)
        localStorage.setItem(url, JSON.stringify(json))
        if (localStorage.getItem("pokedex")) setPokedex(JSON.parse(localStorage.getItem("pokedex")))
    })
      .catch(error => console.error('Error fetching data:', error))
    }
  },[url])

  const addPokemonToPokedex = (pokemonToAdd) => {
    const pokemonToAddCloned = JSON.parse(JSON.stringify(pokemonToAdd))  // Deep copy to enable several instance of same pokemon in pokedex 
    if (pokedex.length == 6) return
    setPokedex([...pokedex, pokemonToAddCloned])
  }

  const removePokemonFromPokedex = (pokemonToRemoveId) => {
    setPokedex(() => {
        return pokedex.filter(pokemon => pokemon !== pokemonToRemoveId)
        })
  }

  const addMoreInfo = (pokemon) => {
    setMoreInfoPokemon(pokemon)
  }

  const addPokemons = (pokes) => {
    if (pokes) setPokemons([pokes])
  }

  return (
    <>
    <SearchBarPokemon addPokemons={addPokemons}/>
    <button onClick={() => setUrl("https://pokeapi.co/api/v2/pokemon")}>Reset Search</button>
    <h2>My Team</h2>
    <Pokedex pokedex={pokedex} removePokemonFromPokedex={removePokemonFromPokedex}/>
    <h2>More info</h2>
    <MoreInfoPokemon moreInfoPokemon={moreInfoPokemon} />
    <h2>All pokemons</h2>
    <ListPokemons pokemons={pokemons} addPokemonToPokedex={addPokemonToPokedex} addMoreInfo={addMoreInfo}/>
    {prevUrl !== null ? <button onClick={() => setUrl(prevUrl)}>Prev page</button> : null}
    <button onClick={() => setUrl(nextUrl)}>Next page</button>
    </>
  )
}

export default App