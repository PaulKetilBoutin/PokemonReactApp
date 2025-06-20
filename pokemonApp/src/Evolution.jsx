import { useEffect, useState } from "react"

export default function Evolution({evolution, setEvolution, name}) {
    const [evolutionData, setEvolutionData] = useState([])
    const [loading, setLoading] = useState(true) // <=== Loading work around

    useEffect(() => {
        if (name in evolutionData || Object.keys(evolution).length == 0) return
        fetch(evolution)
            .then((resp) => resp.json())
            .then((json2) => {
                let evoChain = []
                evoChain.push(json2.chain.species.name)
                if (json2.chain.evolves_to.length != 0) {
                    evoChain.push(json2.chain.evolves_to[0].species.name)
                    if (json2.chain.evolves_to[0].evolves_to.length != "0") evoChain.push(json2.chain.evolves_to[0].evolves_to[0].species.name)
                }
                evoChain.map(evo => {
                    Object.assign(evolutionData, {[evo]: evoChain})
                })
                setEvolutionData(evolutionData)
                setEvolution("")
                setLoading(false)
            })
            .catch(error => console.error('Error fetching data:', error))
    }),[name]
    
    if (loading) return <div>Loading...</div>;
    return (
            <ul>
                {evolutionData.hasOwnProperty(name) && evolutionData[name].map((evolve) => {
                    return (
                        <li key={evolve + name}> {evolve}</li>
                    )
                })}
            </ul>
    )
}