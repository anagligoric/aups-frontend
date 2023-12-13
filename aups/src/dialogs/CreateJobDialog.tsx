/* eslint-disable */

import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useStyles } from '../style/Dialog.style'
import { DialogContent, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Client } from '../models/Client'
import { Job } from '../models/Job'
import { getClientById } from '../services/ClientService'

export interface CreateJobDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (job: Job, id?: number) => void;
  availableClients: Client[]
  onCancel?: () => void;
  selectedJob?: Job;
}

export function CreateJobDialog (props: CreateJobDialogProps) {

  const { classes } = useStyles()
  const { watch, control, formState } = useForm({ mode: 'onChange' })

  const [type, setType] = useState(props.selectedJob?.type || '')
  const [description, setDescription] = useState(props.selectedJob?.description || '')
  const [client, setClient] = useState(props.selectedJob?.client || props.availableClients[0])

  function handleConfirm () {
    const job: Job = { type: type, description: description, client: client } as Job
    if (props.selectedJob) {
      props.onConfirm(job, props.selectedJob.id)
      return
    }
    props.onConfirm(job)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const typeWatch = watch('number')
  const descriptionWatch = watch('creationDate')
  const clientWatch = watch('client')

  useEffect(() => {
    if (typeWatch) {
      setType(typeWatch)
    }
  }, [typeWatch])

  useEffect(() => {
    if (descriptionWatch) {
      setDescription(descriptionWatch)
    }
  }, [descriptionWatch])

  useEffect(() => {
    if (clientWatch) {
      setClient(props.availableClients.find(client => client.id === clientWatch) || client)
    }
  }, [clientWatch])

  return (
    <Dialog fullWidth open={props.isDialogOpen} onClose={handleCancel} data-testid="confirmation-dialog">
      <DialogTitle classes={{ root: 'no-padding' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar className={classes.noPadding}>{props.text}</Toolbar>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <Controller
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
              autoFocus
              fullWidth
              required
              label={'Type'}
              margin="normal"
              helperText={formState.errors?.type?.message?.toString() || ''}
              error={!!formState.errors.type}
            />
          )}
        /><Controller
          name="creationDate"
          defaultValue={description}
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
              label={'Description'}
              margin="normal"
              helperText={formState.errors?.description?.message?.toString() || ''}
              error={!!formState.errors.description}
            />
          )}
        /><FormControl fullWidth>
          <Controller
            name={'client'}
            control={control}
            defaultValue={client.id}
            render={({ field }) => (
              <Select
                variant='standard'
                {...field}
                required
                label={'Role'}
              >
                {props.availableClients.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.firstName}
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
