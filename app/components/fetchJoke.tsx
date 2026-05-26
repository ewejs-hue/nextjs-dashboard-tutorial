'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Joke } from "../types/joke"

interface GetAnotherJokeProps {
    currentJoke: Joke
}

export default function GetAnotherJoke({currentJoke}: GetAnotherJokeProps) {
    const [favourite, setFavourite] = useState<Joke[]>([])
    const router = useRouter()

    const handleRefresh = () => {
        router.refresh()
    }

    function addFavourite(){
        const existed = favourite.some(joke => joke.id === currentJoke.id)
        if(!existed){
            setFavourite(prevFavourites => [...prevFavourites, currentJoke])
        }
    }

    return(
        <>
            <button onClick={handleRefresh}>Get Another Joke</button>
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