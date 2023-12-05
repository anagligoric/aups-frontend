import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import {
  ThemeProvider
} from '@mui/material'

import { createTheme } from '@mui/material/styles'
import Tools from './pages/Tools'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { SnackbarProvider } from 'notistack'
import { getToken } from './services/AuthService'
import Locations from './pages/Location'

function App () {
  const [token, setToken] = useState(getToken())
  useEffect(() => {
    setToken(getToken())
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        light: '#ADB59F',
        main: '#0989e3',
        dark: '#005db0'
      },
      secondary: {
        main: '#4db6ac',
        light: '#82e9de',
        dark: '#00867d'
      }
    }
  })

  return (
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={token ? (<Home />) : <Login /> } />
              <Route path="/tools" element={<Tools /> } />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/locations" element={<Locations/>} />

            </Routes>
        </ThemeProvider>
      </SnackbarProvider>
  )
}

export default App
