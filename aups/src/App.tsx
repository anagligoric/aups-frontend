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
import { LightMuiButton } from './models/MuiButton'
import Clients from './pages/Clients'
import { Header } from './components/Header'
import useStyles from './pages/Header.style'

function App () {
  const { classes } = useStyles()
  const [token, setToken] = useState(getToken())

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
    },
    components: {
      MuiButton: LightMuiButton,
      MuiAppBar: {
        defaultProps: {
          sx: {
            backgroundColor: '#adb59f',
            padding: 0
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: { root: { padding: 0 } }
      }
    }
  })

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(getToken())
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        {token && <div className={classes.appHeader}>{<Header />}</div>}
        <Routes>
          <Route path="/" element={token ? (<Home />) : <Login />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </ThemeProvider>
    </SnackbarProvider>
  )
}

export default App
