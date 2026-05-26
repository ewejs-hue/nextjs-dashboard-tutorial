import GetAnotherJoke from "./components/fetchJoke"

async function fetchJoke() {
  const res = await fetch('https://official-joke-api.appspot.com/random_joke', {cache: 'no-store'})
  return res.json()
}

export default async function Home() {
  const joke = await fetchJoke()

  return(
    <>
      <ul>
      <li key={joke.id}>
        <strong>{joke.setup}</strong> - {joke.punchline}
      </li>
    </ul>
    <GetAnotherJoke currentJoke={joke}/>
    </>
    
  )
}