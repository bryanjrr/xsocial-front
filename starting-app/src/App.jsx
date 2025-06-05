import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tweet from './tweet/Tweet'
import Following from './Following/Following'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='container'>
        <Tweet />
        <Following />
      </section>
    </>
  )
}

export default App
