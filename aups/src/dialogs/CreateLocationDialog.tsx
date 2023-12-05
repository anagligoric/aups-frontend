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
import { Location } from '../models/Location'

export interface CreateLocationDialogProps {
  isDialogOpen: boolean;
  onConfirm: (location: Location) => void;
  onCancel?: () => void;
  text: string;
}

export function CreateLocationDialog (props: CreateLocationDialogProps) {
  const { classes } = useStyles()

  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')

  function handleConfirm () {
    // TODO call props.onConfirm();
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const cityWatch = watch('city')
  const streetWatch = watch('street')
  const numberWatch = watch('number')

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
