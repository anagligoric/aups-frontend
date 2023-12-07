/* eslint-disable */

import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material//Button'
import { useStyles } from './dialog.style'
import { DialogContent, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { User } from '../models/User'

export interface CreateUserDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (user: User) => void;
  onCancel?: () => void;
  selectedUser?: User;
}

export function CreateUserDialog (props: CreateUserDialogProps) {
  const { classes } = useStyles()

  const [firstName, setFirstName] = useState(props.selectedUser?.firstName || '')
  const [surname, setSurname] = useState(props.selectedUser?.surname || '')
  const [email, setPhoneNumber] = useState(props.selectedUser?.email || '')
  const [role, setRole] = useState(props.selectedUser?.role || '')

  function handleConfirm () {
    const user: User = { firstName, surname, email, role } as unknown as User
    if (props.selectedUser) {
      user.id = props.selectedUser?.id
    }
    props.onConfirm(user)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const firstNameWatch = watch('firstName')
  const surnameWatch = watch('surname')
  const emailWatch = watch('email')
  const roleWatch = watch('role')

  useEffect(() => {
    if (firstNameWatch) {
      setFirstName(firstNameWatch)
    }
  }, [firstNameWatch])

  useEffect(() => {
    if (surnameWatch) {
      setSurname(surnameWatch)
    }
  }, [surnameWatch])

  useEffect(() => {
    if (emailWatch) {
      setPhoneNumber(emailWatch)
    }
  }, [emailWatch])

  useEffect(() => {
    if (roleWatch) {
      setRole(roleWatch)
    }
  }, [roleWatch])

  return (
    <Dialog fullWidth open={props.isDialogOpen} onClose={handleCancel} data-testid="confirmation-dialog">
      <DialogTitle classes={{ root: 'no-padding' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar className={classes.noPadding}>{props.text}</Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <Controller
          name="firstName"
          defaultValue={firstName}
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
              onSubmit={() => { }}
              autoFocus
              fullWidth
              required
              label={'FirstName'}
              margin="normal"
              helperText={formState.errors?.firstName?.message?.toString() || ''}
              error={!!formState.errors.firstName}
            />
          )}
        /><Controller
          name="surname"
          defaultValue={surname}
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
              onSubmit={() => { }}
              autoFocus
              fullWidth
              required
              label={'Surname'}
              margin="normal"
              helperText={formState.errors?.surname?.message?.toString() || ''}
              error={!!formState.errors.surname}
            />
          )}
        /><Controller
          name="email"
          defaultValue={email}
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
              onSubmit={() => { }}
              autoFocus
              fullWidth
              required
              label={'Email'}
              margin="normal"
              helperText={formState.errors?.email?.message?.toString() || ''}
              error={!!formState.errors.email}
            />
          )}
        />
        <Controller
          name="city"
          defaultValue={role}
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
              onSubmit={() => { }}
              autoFocus
              fullWidth
              required
              label={'Role'}
              margin="normal"
              helperText={formState.errors?.role?.message?.toString() || ''}
              error={!!formState.errors.role}
            />
          )}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          disabled={!formState.isValid}
          onClick={handleConfirm}
          variant="text"
          autoFocus
          data-testid="yes-button"
        >
          {'Save'}
        </Button>
        {props.onCancel && (
          <Button onClick={props.onCancel} variant="text" data-testid="no-button" className={classes.dialogButton} color={'primary'}>
            {'Cancel'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
