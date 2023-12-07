import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/login.css'
import { login } from '../services/AuthService'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import useStyles from './Login.style'
import { useCloseableSnackbar } from '../hooks/use-closeable-snackbar-hook'

export const Login = () => {
  const nav = useNavigate()
  const { classes } = useStyles()
  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const { enqueueErrorSnackbar } = useCloseableSnackbar()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailWatch = watch('email')
  const passwordWatch = watch('password')

  useEffect(() => {
    if (emailWatch) {
      setEmail(emailWatch)
    }
  }, [emailWatch])

  useEffect(() => {
    if (passwordWatch) {
      setPassword(passwordWatch)
    }
  }, [passwordWatch])

  function handleSubmit (event: any) {
    event.preventDefault()
    login(email, password)
      .then(() => {
        nav('/')
      })
      .catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })
  }

  function handleTogglePassword () {
    setShowPassword((prev) => !prev)
  }

  return (<div >
    <form className="loginForm">
      <div className={classes.imgContainer}>
        <img src="avatar.png" alt="Avatar" className={classes.avatar} />
      </div>
      <div className="container">
        <Controller
          name="email"
          defaultValue={email}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Required'
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }

          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              autoFocus
              fullWidth
              required
              type={'email'}
              label={'Enter email'}
              margin="normal"
              helperText={formState.errors?.email?.message?.toString() || ''}
              error={!!formState.errors.email}
            />
          )}
        />

        <Controller
          name="password"
          defaultValue={password}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Required'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              autoFocus
              fullWidth
              required
              type={showPassword ? 'text' : 'password'}
              label={'Enter password'}
              margin="normal"
              helperText={formState.errors?.password?.message?.toString() || ''}
              error={!!formState.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        <Button
          disabled={!formState.isValid}
          onClick={handleSubmit}
          variant="text"
          autoFocus
        >
          {'Login'}
        </Button>
      </div>
    </form>
  </div>
  )
}
