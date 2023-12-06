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
import { Client } from '../models/Client'

export interface CreateClientDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (client: Client) => void;
  onCancel?: () => void;
  selectedClient?: Client;
}

export function CreateClientDialog (props: CreateClientDialogProps) {
  const { classes } = useStyles()

  useEffect(() => {
    console.log(props.selectedClient)
  }, [props.selectedClient])

  const [firstName, setFirstName] = useState(props.selectedClient?.firstName || '')
  const [surname, setSurname] = useState(props.selectedClient?.surname || '')
  const [phoneNumber, setPhoneNumber] = useState(props.selectedClient?.phoneNumber || '')
  const [city, setCity] = useState(props.selectedClient?.city || '')
  const [street, setStreet] = useState(props.selectedClient?.street || '')
  const [number, setNumber] = useState(props.selectedClient?.number || '')

  function handleConfirm () {
    const client: Client = { firstName, surname, phoneNumber, city, street, number } as Client
    console.log(client)
    if (props.selectedClient) {
      client.id = props.selectedClient?.id
    }
    console.log(client)
    props.onConfirm(client)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const firstNameWatch = watch('firstName')
  const surnameWatch = watch('surname')
  const phoneNumberWatch = watch('phoneNumber')
  const cityWatch = watch('city')
  const streetWatch = watch('street')
  const numberWatch = watch('number')

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
    if (phoneNumberWatch) {
      setPhoneNumber(phoneNumberWatch)
    }
  }, [phoneNumberWatch])

  useEffect(() => {
    if (cityWatch) {
      setCity(cityWatch)
    }
  }, [cityWatch])

  useEffect(() => {
    if (streetWatch) {
      setStreet(streetWatch)
    }
  }, [streetWatch])

  useEffect(() => {
    if (numberWatch) {
      setNumber(numberWatch)
    }
  }, [numberWatch])

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
          name="phoneNumber"
          defaultValue={phoneNumber}
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
              label={'PhoneNumber'}
              margin="normal"
              helperText={formState.errors?.phoneNumber?.message?.toString() || ''}
              error={!!formState.errors.phoneNumber}
            />
          )}
        />
        <Controller
          name="city"
          defaultValue={city}
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
              label={'City'}
              margin="normal"
              helperText={formState.errors?.city?.message?.toString() || ''}
              error={!!formState.errors.city}
            />
          )}
        />
        <Controller
          name="street"
          defaultValue={street}
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
              label={'Street'}
              margin="normal"
              helperText={formState.errors?.street?.message?.toString() || ''}
              error={!!formState.errors.street}
            />
          )}
        />
        <Controller
          name="number"
          defaultValue={number}
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
              type='number'
              autoFocus
              fullWidth
              required
              label={'Number'}
              margin="normal"
              helperText={formState.errors?.number?.message?.toString() || ''}
              error={!!formState.errors.number}
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
