import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useStyles } from './dialog.style'
import { DialogContent, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { User, UserDto } from '../models/User'
import { mapRoleName } from '../services/UserService'
import { Role } from '../models/Role'

export interface CreateUserDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (user: UserDto, id?: number) => void;
  availableRoles: Role[]
  onCancel?: () => void;
  selectedUser?: User;
}

export function CreateUserDialog (props: CreateUserDialogProps) {
  const { classes } = useStyles()
  const { watch, control, formState } = useForm({ mode: 'onChange' })

  const [firstName, setFirstName] = useState(props.selectedUser?.firstName || '')
  const [surname, setSurname] = useState(props.selectedUser?.surname || '')
  const [email, setPhoneNumber] = useState(props.selectedUser?.email || '')
  const [role, setRole] = useState(props.selectedUser?.role || props.availableRoles[0])

  function handleConfirm () {
    const user: UserDto = { firstName, surname, email, roleId: role?.id } as UserDto
    if (props.selectedUser) {
      props.onConfirm(user, props.selectedUser.id)
      return
    }
    props.onConfirm(user)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

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
      setRole(props.availableRoles.find(role => role.id === roleWatch) || role)
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
        <FormControl fullWidth>
          <Controller
            name={'role'}
            control={control}
            defaultValue={role.id}
            render={({ field }) => (
              <Select
                variant='standard'
                {...field}
                required
                label={'Role'}
              >
                {props.availableRoles.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {mapRoleName(option.name)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

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
