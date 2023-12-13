import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material//Button'
import { useStyles } from '../style/Dialog.style'
import { DialogContent, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Vehicle } from '../models/Vehicle'

export interface CreateVehicleDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (vehicle: Vehicle) => void;
  onCancel?: () => void;
  selectedVehicle?: Vehicle;
}

export function CreateVehicleDialog (props: CreateVehicleDialogProps) {
  const { classes } = useStyles()

  const [name, setName] = useState(props.selectedVehicle?.name || '')
  const [licencePlate, setLicencePlate] = useState(props.selectedVehicle?.status || '')
  const [type, setType] = useState(props.selectedVehicle?.type || '')

  function handleConfirm () {
    const vehicle: Vehicle = { name, status: licencePlate, type } as Vehicle
    if (props.selectedVehicle) {
      vehicle.id = props.selectedVehicle?.id
    }
    props.onConfirm(vehicle)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const nameWatch = watch('creationDate')
  const licencePlateWatch = watch('licencePlate')
  const typeWatch = watch('number')

  useEffect(() => {
    if (nameWatch) {
      setName(nameWatch)
    }
  }, [nameWatch])

  useEffect(() => {
    if (licencePlateWatch) {
      setLicencePlate(licencePlateWatch)
    }
  }, [licencePlateWatch])

  useEffect(() => {
    if (typeWatch) {
      setType(typeWatch)
    }
  }, [typeWatch])

  return (
    <Dialog fullWidth open={props.isDialogOpen} onClose={handleCancel} data-testid="confirmation-dialog">
      <DialogTitle classes={{ root: 'no-padding' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar className={classes.noPadding}>{props.text}</Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <Controller
          name="creationDate"
          defaultValue={name}
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
              label={'Name'}
              margin="normal"
              helperText={formState.errors?.name?.message?.toString() || ''}
              error={!!formState.errors.name}
            />
          )}
        /><Controller
          name="licencePlate"
          defaultValue={licencePlate}
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
              label={'LicencePlate'}
              margin="normal"
              helperText={formState.errors?.licencePlate?.message?.toString() || ''}
              error={!!formState.errors.licencePlate}
            />
          )}
        /><Controller
          name="number"
          defaultValue={type}
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
              label={'Type'}
              margin="normal"
              helperText={formState.errors?.type?.message?.toString() || ''}
              error={!!formState.errors.type}
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
