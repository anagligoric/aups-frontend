import React from 'react'
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

function App () {
  const theme = createTheme({

    palette: {
      primary: {
        light: '#63b8ff',
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
              <Route path="/" element={<Home /> } />
              <Route path="/alati" element={<Tools /> } />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
        </ThemeProvider>
      </SnackbarProvider>
  )
}

export default App
