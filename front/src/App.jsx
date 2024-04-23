import { Transferencia } from './componentes/Transferencia'
import { BrowserRouter, Routes , Route, Outlet } from 'react-router-dom'
import React from 'react'
import { Datos } from './componentes/Datos'
import { Layout } from './componentes/Layout'


function App() {
  return(
    <BrowserRouter>
         <Layout/>
    <Routes>
      <Route path='/' element={<Transferencia/>} />
      <Route path='/tx' element={<Transferencia/>} />
      <Route path='/datos' element={<Datos/>} />
  
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
