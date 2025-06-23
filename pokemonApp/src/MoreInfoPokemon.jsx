import { Suspense, useEffect, useState } from "react";
import Evolution from "./Evolution";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function MoreInfoPokemon({moreInfoPokemon}){
    const [evolution, setEvolution] = useState("")
    
    useEffect(() => {
        if (Object.keys(moreInfoPokemon).length == 0) return
        const url = 'https://pokeapi.co/api/v2/pokemon-species/' + moreInfoPokemon.id
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let evo = json.evolution_chain.url
            setEvolution(evo)
        })
        .catch(error => console.error('Error fetching data:', error))
    }, [moreInfoPokemon])

    if (Object.keys(moreInfoPokemon).length == 0) return (<div>No info</div>)

    const rows = [
        {"name": 'Base Exp', "stats": moreInfoPokemon.base_experience},
        {"name": 'Height', "stats": moreInfoPokemon.height},
        {"name": 'Weight', "stats": moreInfoPokemon.weight},
        {"name": 'Abilities', "stats": moreInfoPokemon.abilities.map((abilitie) => {return ([abilitie.ability.name])}).toString()},
    ];
    return(
        <>
            <img src={moreInfoPokemon.sprites.front_default}/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead> 
                <TableRow>
                    <TableCell>{moreInfoPokemon.name}</TableCell>
                    <TableCell align="right"> - </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.stats}</TableCell>
                    </TableRow>
                ))}
                <TableRow
                    key="Evolutions"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        Evolutions
                    </TableCell>
                    <TableCell align="right"><Evolution evolution={evolution} setEvolution={setEvolution} name={moreInfoPokemon.name} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}