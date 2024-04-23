import React from 'react'
import { Link } from 'react-router-dom'

export const Layout = () => {
  return (
    <nav className='navegador'>
        <ul className='lista'>
            <li>
                <Link to="/tx">Faucet</Link>
            </li>
            <li>
                <Link to="/datos">Transferencia</Link>
            </li>
        </ul>
    </nav>
  )
}
