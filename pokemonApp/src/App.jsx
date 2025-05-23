import { useEffect, useState } from 'react'
import './App.css'
import { ListPokemons } from './ListPokemons'
import { SearchBarPokemon } from './SearchBarPokemon'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [prevUrl, setPrevUrl] = useState("")
  const [nextUrl, setNextUrl] = useState("")
  
  useEffect(() => {
    fetch(url).then((response) => response.json()).then((json) => {
      setPokemons(json.results)
      setPrevUrl(json.previous)
      setNextUrl(json.next)
  })
    .catch(error => console.error('Error fetching data:', error))
  },[url])

  function addPokemons(pokes) {
    console.log(pokes)
    console.log(pokemons)
    if (pokes != "") setPokemons(pokes)
  }
  return (
    <>
    {/*<SearchBarPokemon addPokemons={addPokemons}/>*/}
    <ListPokemons pokemons={pokemons}/>
    {prevUrl !== "" ? <button onClick={() => setUrl(prevUrl)}>Prev page</button> : null}
    <button onClick={() => setUrl(nextUrl)}>Next page</button>
    </>
  )
}

export default App
