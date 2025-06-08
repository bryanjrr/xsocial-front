import { useState } from 'react'
import './Menu.css'


function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='menu-container'>
        <nav className='menu-navegador'>
          <div>
            <i class="fa-solid fa-house"></i>
            <a href="">Home</a>
          </div>

          <div>
            <i class="fa-solid fa-magnifying-glass"></i>
            <a href="">Feed</a>
          </div>

          <div>
            <i class="fa-solid fa-user"></i>
            <a href="">Profile</a>
          </div>

        </nav>
        <nav className='menu-navegador'>

          <div>
            <i class="fa-solid fa-gear"></i>
            <a href="">Settings</a>
          </div>
          <div className="">
            <i class="fa-solid fa-right-from-bracket"></i>
            <a href="">Logout</a>
          </div>
        </nav>
      </section >
    </>
  )
}

export default Menu;
