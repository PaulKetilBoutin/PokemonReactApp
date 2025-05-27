export function MoreInfoPokemon({pokemonInfo}){
    
    console.log("UPDATE MORE INFO")
    console.log(pokemonInfo)
    if (!pokemonInfo) {
        return (<div>No info</div>)
    }
    return(
        <div>
            {pokemonInfo.name}
        </div>
    )
}