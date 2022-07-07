import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddAlat from './pages/AddAlat'
import AddLokacija from './pages/AddLokacija'
import Alati from './pages/Alati'
import EditAlat from './pages/EditAlat'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import Lokacije from './pages/Lokacije'

function App () {
  return <div>
    <Routes>
      <Route path="/" element={<Home /> } />
      <Route path="/alati" element={<Alati /> } />
      <Route path="/lokacije" element={<Lokacije /> } />
      <Route path="/addAlat" element={<AddAlat /> } />
      <Route path="/addLokacija" element={<AddLokacija /> } />
      <Route path="/editAlat/:id" element={<EditAlat />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </div>
}

export default App
