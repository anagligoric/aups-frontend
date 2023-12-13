/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  ThemeProvider
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import Tools from './pages/Tools'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { SnackbarProvider } from 'notistack'
import { getRole, getToken } from './services/AuthService'
import { LightMuiButton } from './models/MuiButton'
import Clients from './pages/Clients'
import { Header } from './components/Header'
import useStyles from './style/Additional.style'
import AdditionalPage from './pages/Additional'
import Vehicles from './pages/Vechicles'
import Users from './pages/Users'
import Jobs from './pages/Job'
import Documents from './pages/Document'

function App () {
  const { classes } = useStyles()
  const [token, setToken] = useState(getToken())
  const [isAdmin, setIsAdmin] = useState(getRole() === 'ROLE_ADMIN')

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
      setIsAdmin(getRole() === 'ROLE_ADMIN')
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  function renderForbiddenPage () {
    return <AdditionalPage title='403 - Forbidden'
      message='You are not allowed to see this page.'
    />
  }

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        {token && <div className={classes.appHeader}>{<Header />}</div>}
        <Routes>
          <Route path="/" element={token ? (<Home />) : <Login />} />
          <Route path="/tools" element={isAdmin ? <Tools /> : renderForbiddenPage()} />
          <Route path="/login" element={<Login />} />
          <Route path="/clients" element={isAdmin ? <Clients /> : renderForbiddenPage()} />
          <Route path="/users" element={isAdmin ? <Users /> : renderForbiddenPage()} />
          <Route path="/vehicles" element={<Vehicles />} />
		  <Route path="/jobs" element={<Jobs/>} />
		  <Route path="/documents" element={<Documents/>} />
          <Route path='*' element={<AdditionalPage title='404 - Not Found' message='The page you are looking for might have been removed or is temporarily unavailable.' />} />
        </Routes>
      </ThemeProvider>
    </SnackbarProvider>
  )
}

export default App
