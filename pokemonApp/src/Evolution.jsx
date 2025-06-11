import { useEffect, useState } from "react"

export default function Evolution({evolution, name}) {
    const [evolutionData, setEvolutionData] = useState([])
    const [loading, setLoading] = useState(true) // <=== STYLé

    useEffect(() => {
        if (name in evolutionData || Object.keys(evolution).length == 0) return
        fetch(evolution)
            .then((resp) => resp.json())
            .then((json2) => {
                let evoChain = []
                evoChain.push(json2.chain.species.name)
                if ("evolves_to" in json2.chain) evoChain.push(json2.chain.evolves_to[0].species.name)
                if ("evolves_to" in json2.chain.evolves_to[0]) evoChain.push(json2.chain.evolves_to[0].evolves_to[0].species.name)
                evoChain.map(evo => {
                    Object.assign(evolutionData, {[evo]: evoChain})
                })
                setEvolutionData(evolutionData)
                setLoading(false)
            })
            .catch(error => console.error('Error fetching data:', error))
    }),[name]
    
    console.log(evolutionData)
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
            <ul>
                {evolutionData.hasOwnProperty(name) && evolutionData[name].map((evolve) => {
                    return (
                        <li key={name + evolve[0]}> {evolve}</li>
                    )
                })}
            </ul>
    )
}