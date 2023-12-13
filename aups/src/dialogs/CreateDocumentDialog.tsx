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
import { Document } from '../models/Document'
import { Job } from '../models/Job'

export interface CreateDocumentDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (document: Document, id?: number) => void;
  availableJobs: Job[]
  onCancel?: () => void;
  selectedDocument?: Document;
}

export function CreateDocumentDialog (props: CreateDocumentDialogProps) {
  const { classes } = useStyles()
  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const [number, setNumber] = useState(props.selectedDocument?.number || '')
  const [creationDate, setCreationDate] = useState(props.selectedDocument?.creationDate || '')
  const [price, setPrice] = useState(props.selectedDocument?.price || '')
  const [job, setJob] = useState(props.selectedDocument?.job || props.availableJobs[0])

  function handleConfirm () {
    const document: Document = { number, creationDate, price, job } as Document
    if (props.selectedDocument) {
      props.onConfirm(document, props.selectedDocument.id)
      return
    }
    props.onConfirm(document)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const numberWatch = watch('number')
  const creationDateWatch = watch('creationDate')
  const priceWatch = watch('price')
  const jobWatch = watch('job')

  useEffect(() => {
    if (numberWatch) {
      setNumber(numberWatch)
    }
  }, [numberWatch])

  useEffect(() => {
    if (creationDateWatch) {
      setCreationDate(creationDateWatch)
    }
  }, [creationDateWatch])

  useEffect(() => {
    if (priceWatch) {
      setPrice(priceWatch)
    }
  }, [priceWatch])

  useEffect(() => {
    if (jobWatch) {
      setJob(props.availableJobs.find(job => job.id === jobWatch) || job)
    }
  }, [jobWatch])

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
        <Controller
          name="creationDate"
          defaultValue={creationDate}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Required'
            }
          }}
          render={({ field }) => (
            <TextField
              id="date"
              type="date"
              {...field}
              variant="standard"
              fullWidth
              required
              label={''}
              margin="normal"
              helperText={formState.errors?.creationDate?.message?.toString() || ''}
              error={!!formState.errors.creationDate}
            />
          )}
        /><Controller
          name="price"
          defaultValue={price}
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
              label={'Price'}
              margin="normal"
              helperText={formState.errors?.price?.message?.toString() || ''}
              error={!!formState.errors.price}
            />
          )}
        /><FormControl fullWidth>
          <Controller
            name={'job'}
            control={control}
            defaultValue={job ? job.id : ''}
            render={({ field }) => (
              <Select
                variant='standard'
                {...field}
                required
                label={'Job'}
              >
                {props.availableJobs.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.description}
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
