import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Alati from './pages/Alati'
import Home from './pages/Home'
import { Login } from './pages/Login'
import Lokacije from './pages/Lokacije'
import { Register } from './pages/Register'

function App () {
  return <div>
    <Routes>
      <Route path="/" element={<Home /> } />
      <Route path="/alati" element={<Alati /> } />
      <Route path="/lokacije" element={<Lokacije /> } />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </div>
}

export default App
