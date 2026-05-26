'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Joke } from "../types/joke"

interface GetAnotherJokeProps {
    currentJoke: Joke
}

export default function GetAnotherJoke({currentJoke}: GetAnotherJokeProps) {
    const [favourite, setFavourite] = useState<Joke[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleRefresh = () => {
        setLoading(true)
        router.refresh()
        setLoading(false)
    }

    function addFavourite(){
        const existed = favourite.some(joke => joke.id === currentJoke.id)
        if(!existed){
            setFavourite(prevFavourites => [...prevFavourites, currentJoke])
        }
    }

    return(
        <>
            <button onClick={handleRefresh} disabled={loading}>{ loading? 'Loading...' : 'Get Another Joke' }</button>
            <button onClick={addFavourite}>❤️ Favorite</button>
            {favourite.length>0 && (
                <div>
                    <h3>Favourite Jokes:</h3>
                    <ul>
                        {favourite.map(j=>(
                            <li key={j.id}>{j.setup} - {j.punchline}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
        
    )
}