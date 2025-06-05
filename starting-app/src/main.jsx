import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Menu from './menu/Menu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section className='main-container'>
      <Menu className='menu' />
      <App />
    </section>

  </StrictMode>,
)
