import { useState } from 'react'
import './Menu.css'


function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='menu-container'>
        <nav>
          <a href="">Home</a>
          <a href="">Feed</a>
          <a href="">Profile</a>
        </nav>
        <nav>
          <a href="">Settings</a>
          <a href="">Logout</a>
        </nav>
      </section >
    </>
  )
}

export default Menu;
