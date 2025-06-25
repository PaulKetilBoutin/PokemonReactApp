import { useEffect, useState } from 'react'
import './App.css'
import  ListPokemons from './ListPokemons'
import { SearchBarPokemon } from './SearchBarPokemon'
import { Pokedex } from './Pokedex'
import { MoreInfoPokemon } from './MoreInfoPokemon'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokedex, setPokedex] = useState([])
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [prevUrl, setPrevUrl] = useState(null)
  const [nextUrl, setNextUrl] = useState(null)
  const [moreInfoPokemon, setMoreInfoPokemon] = useState({})
  const defaultUrl = "https://pokeapi.co/api/v2/pokemon/"
  
  useEffect(() => {
    if (pokedex.length === 0) return 
    localStorage.setItem("pokedex", JSON.stringify(pokedex))
  }, [pokedex]) 

  useEffect(() => {
    if (url == "RESET") setUrl(defaultUrl)
    if (JSON.parse(localStorage.getItem(url))) { // check if data already in local stroage before fetch
      const res = JSON.parse(localStorage.getItem(url))
      setPokemons(res.results)
      setPrevUrl(res.previous)
      setNextUrl(res.next)
      if (localStorage.getItem("pokedex")) setPokedex(JSON.parse(localStorage.getItem("pokedex")))
    }
    else {
      if (url == "RESET") return
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
    <Container>
      <SearchBarPokemon addPokemons={addPokemons}/>
      <Button variant="outlined" onClick={() => setUrl("RESET")}>Reset Search</Button>
      <Typography variant='h3'>My Team</Typography>
      <Pokedex pokedex={pokedex} removePokemonFromPokedex={removePokemonFromPokedex}/>
      <Typography variant='h3'>More info</Typography>
      <MoreInfoPokemon moreInfoPokemon={moreInfoPokemon} />
      <Typography variant='h3'>All pokemons</Typography>
      <ListPokemons pokemons={pokemons} addPokemonToPokedex={addPokemonToPokedex} addMoreInfo={addMoreInfo}/>
      <Stack spacing={2} direction="row">
        {prevUrl !== null ? <Button variant="contained" onClick={() => setUrl(prevUrl)}>Prev page</Button> : null }
        <Button variant="contained" onClick={() => setUrl(nextUrl)}>Next page</Button>
      </Stack>
    </Container>
  )
}

export default App