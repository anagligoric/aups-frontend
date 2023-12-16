import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useStyles } from '../style/Dialog.style'
import { Autocomplete, Box, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Document } from '../models/Document'
import { Job } from '../models/Job'
import { Vehicle } from '../models/Vehicle'
import { Tool } from '../models/Tool'

export interface CreateDocumentDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (document: Document, id?: number) => void;
  availableJobs: Job[]
  availableVehicles: Vehicle[]
  availableTools: Tool[]
  onCancel?: () => void
  selectedDocument?: Document
}

export function CreateDocumentDialog (props: CreateDocumentDialogProps) {
  const { classes } = useStyles()
  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const [number, setNumber] = useState(props.selectedDocument?.number || '')
  const [price, setPrice] = useState(props.selectedDocument?.price || '')
  const [job, setJob] = useState(props.selectedDocument?.job || props.availableJobs[0])
  const [vehicle, setVehicle] = useState(props.selectedDocument?.vehicle || props.availableVehicles[0])
  const [tools, setTools] = useState(props.selectedDocument?.tools || [])

  function handleConfirm () {
    const document: Document = { number, creationDate: new Date(), price, job, vehicle, tools } as Document
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
  const priceWatch = watch('price')
  const jobWatch = watch('job')
  const vehicleWatch = watch('vehicle')
  const toolsWatch = watch('tools')

  useEffect(() => {
    if (numberWatch) {
      setNumber(numberWatch)
    }
  }, [numberWatch])

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

  useEffect(() => {
    if (vehicleWatch) {
      setVehicle(props.availableVehicles.find(vehicle => vehicle.id === vehicleWatch) || vehicle)
    }
  }, [vehicleWatch])

  useEffect(() => {
    if (toolsWatch) {
      setTools(toolsWatch)
    }
  }, [toolsWatch])

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
              label={'Document Number'}
              margin="normal"
              helperText={formState.errors?.number?.message?.toString() || ''}
              error={!!formState.errors.number}
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
              type='number'
              label={'Price'}
              margin="normal"
              helperText={formState.errors?.price?.message?.toString() || ''}
              error={!!formState.errors.price}
            />
          )}
        />
        <Box marginTop={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ marginLeft: '-15px' }}>
              Job Description*
            </InputLabel>
            <Controller
              name={'job'}
              control={control}
              defaultValue={job ? job.id : ''}
              rules={{
                required: {
                  value: true,
                  message: 'Required'
                }
              }}
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
        </Box>
        <Box marginTop={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ marginLeft: '-15px' }}>
              Vehicle*
            </InputLabel>
            <Controller
              name={'vehicle'}
              control={control}
              defaultValue={vehicle ? vehicle.id : ''}
              rules={{
                required: {
                  value: true,
                  message: 'Required'
                }
              }}
              render={({ field }) => (
                <Select
                  variant='standard'
                  {...field}
                  required
                  label={'Vehicle'}
                >
                  {props.availableVehicles.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.licencePlate}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <Controller
            name={'tools'}
            control={control}
            defaultValue={tools || []}
            rules={{
              required: {
                value: true,
                message: 'Required'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={props.availableTools}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={(event, value) => onChange(value)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Select Tools" fullWidth />
                )}
                isOptionEqualToValue={(option, selectedValue) => option.id === selectedValue.id}
              />
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
