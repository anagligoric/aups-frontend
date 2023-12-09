import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material//Button'
import { useStyles } from './dialog.style'
import { DialogContent, IconButton, InputAdornment, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { ResetPassword } from '../models/ResetPassword'
import { getCurrentUserUsername } from '../services/AuthService'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export interface ResetPasswordDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (resetPassword: ResetPassword) => void;
  onCancel: () => void;
}

export function ResetPasswordDialog (props: ResetPasswordDialogProps) {
  const { classes } = useStyles()
  const { watch, control, formState, trigger, reset, getValues } = useForm({ mode: 'onChange' })

  const [currentUsername, setCurrentUsername] = useState(getCurrentUserUsername())

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const oldPasswordWatch = watch('oldPassword')
  const newPasswordWatch = watch('newPassword')
  const confirmPasswordWatch = watch('confirmPassword')

  useEffect(() => {
    if (oldPasswordWatch) {
      setOldPassword(oldPasswordWatch)
    }
  }, [oldPasswordWatch])

  useEffect(() => {
    if (newPasswordWatch) {
      setNewPassword(newPasswordWatch)
      trigger('confirmPassword')
    }
  }, [newPasswordWatch])

  useEffect(() => {
    if (confirmPasswordWatch) {
      setConfirmPassword(confirmPasswordWatch)
    }
  }, [confirmPasswordWatch])

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUsername(getCurrentUserUsername())
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  function handleToggleOldPassword () {
    setShowOldPassword((prev) => !prev)
  }

  function handleToggleNewPassword () {
    setShowNewPassword((prev) => !prev)
  }

  function handleToggleConfirmPassword () {
    setShowConfirmPassword((prev) => !prev)
  }

  function handleCancel () {
    resetData()
    props.onCancel()
  }

  function handleConfirm () {
    resetData()
    const resetPassword: ResetPassword = { username: currentUsername, oldPassword, newPassword }
    props.onConfirm(resetPassword)
  }

  function resetData () {
    reset()
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  function validatePasswordsMatch () {
    const formData = getValues()
    return formData.confirmPassword === formData.newPassword || 'Passwords do not match'
  }

  return (
    <Dialog fullWidth open={props.isDialogOpen} onClose={handleCancel}>
      <DialogTitle classes={{ root: 'no-padding' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar className={classes.noPadding}>{props.text}</Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <Controller
          name="oldPassword"
          defaultValue={oldPassword}
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
              fullWidth
              required
              type={showOldPassword ? 'text' : 'password'}
              label={'Old Password'}
              margin="normal"
              helperText={formState.errors?.oldPassword?.message?.toString() || ''}
              error={!!formState.errors.oldPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleOldPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        /><Controller
          name="newPassword"
          defaultValue={newPassword}
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
              fullWidth
              required
              type={showNewPassword ? 'text' : 'password'}
              label={'New Password'}
              margin="normal"
              helperText={formState.errors?.newPassword?.message?.toString() || ''}
              error={!!formState.errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        /><Controller
          name="confirmPassword"
          defaultValue={confirmPassword}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Required'
            },
            validate: validatePasswordsMatch

          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              fullWidth
              required
              label={'Confirm Password'}
              margin="normal"
              type={showConfirmPassword ? 'text' : 'password'}
              helperText={formState.errors?.confirmPassword?.message?.toString() || ''}
              error={!!formState.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          disabled={!formState.isValid}
          onClick={handleConfirm}
          variant="text"
          data-testid="yes-button"
        >
          {'Confirm'}
        </Button>

          <Button onClick={handleCancel} variant="text" data-testid="no-button" className={classes.dialogButton} color={'primary'}>
            {'Cancel'}
          </Button>

      </DialogActions>
    </Dialog>
  )
}
