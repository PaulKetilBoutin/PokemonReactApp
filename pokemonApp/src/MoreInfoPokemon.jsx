export function MoreInfoPokemon({moreInfoPokemon}){
    
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
            
        </div>
        </>
    )
}