import { Suspense, useEffect, useState } from "react";
import Evolution from "./Evolution";

export function MoreInfoPokemon({moreInfoPokemon}){
    const [evolution, setEvolution] = useState({})
    
    useEffect(() => {
        console.log("HERE MORE INFO FETCH EVOLUTION")
        console.log(moreInfoPokemon)
        if (Object.keys(moreInfoPokemon).length == 0) {
            console.log("EMPTY")
            console.log(moreInfoPokemon)
            return
        }
        const url = 'https://pokeapi.co/api/v2/pokemon-species/' + moreInfoPokemon.id
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let evo = json.evolution_chain.url
            setEvolution(evo)
            /*fetch(evo)
            .then((resp) => resp.json())
            .then((json2) => {
                let evoChain = []
                evoChain.push(json2.chain.species.name)
                if ("evolves_to" in json2.chain) evoChain.push(json2.chain.evolves_to[0].species.name)
                if ("evolves_to" in json2.chain.evolves_to[0]) evoChain.push(json2.chain.evolves_to[0].evolves_to[0].species.name)
                Object.assign(newInfo, {[name]: evoChain})
                setEvolution(newInfo)
            })*/
            
            console.log("EVOLUTION")
            console.log(evo)
            console.log(evolution)
        })
        .catch(error => console.error('Error fetching data:', error))
    }, [moreInfoPokemon])
    console.log("UPDATE MORE INFO")
    console.log(moreInfoPokemon)
    if (Object.keys(moreInfoPokemon).length == 0) {
        return (<div>No info</div>)
    }
    const style_div_in = {
        display: "inline-block",
        width: "100%",
        padding: "5px",
        position: "relative",
        right: "0"
        };
    const style_div_out = {
        padding: "10px",
        display: "flex"
    };
    const style_img = {
        display: "inline-block",
        position: "relative",
        left: "0"
    };
    return(
        <>
            <img src={moreInfoPokemon.sprites.front_default} style={style_img}/>
            <div style={style_div_in}> <br/>
            Name : {moreInfoPokemon.name} <br/>
            Base Exp : {moreInfoPokemon.base_experience} <br/>
            Height : {moreInfoPokemon.height} <br/>
            Weight : {moreInfoPokemon.weight} <br/>
            Abilities :
            <ul>
                {moreInfoPokemon.abilities.map((abilitie) => {
                    return (
                        <li key={moreInfoPokemon.name + abilitie.ability.name}>{abilitie.ability.name}</li>
                    )
                })}
                <li>
                </li>
            </ul>
            Stats :
            <ul>
                {moreInfoPokemon.stats.map((stat) => {
                    console.log(stat)
                    return (
                        <li key={moreInfoPokemon.name + stat.stat.name}>{stat.stat.name} : {stat.base_stat}</li>
                    )
                })}
                <li>
                </li>
            </ul>
            Evolution : 
            <Suspense fallback={<div>Loading</div>}>
                <Evolution evolution={evolution} name={moreInfoPokemon.name} />
            </Suspense>
        </div>
        </>
    )
}