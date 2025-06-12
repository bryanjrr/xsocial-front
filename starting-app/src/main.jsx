import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Menu from './components/menu/Menu.jsx'
import { BrowserRouter } from 'react-router-dom'
import Auth from './pages/Auth/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth></Auth>

    <BrowserRouter>

      {/*         <Menu className='menu' />
        <App /> */}
    </BrowserRouter>

  </StrictMode>,
)
