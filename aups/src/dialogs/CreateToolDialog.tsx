/* eslint-disable */
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
import { Tool } from '../models/Tool'

export interface CreateToolDialogProps {
  isDialogOpen: boolean;
  text: string;
  onConfirm: (tool: Tool) => void;
  onCancel?: () => void;
  selectedTool?: Tool;
}

export function CreateToolDialog (props: CreateToolDialogProps) {
  const { classes } = useStyles()

  const [name, setName] = useState(props.selectedTool?.name || '')

  function handleConfirm () {
    const tool: Tool = { name: name} as Tool
    if (props.selectedTool) {
		tool.id = props.selectedTool?.id
    }
    props.onConfirm(tool)
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const { watch, control, formState } = useForm({ mode: 'onChange' })
  const nameWatch = watch('creationDate')

  useEffect(() => {
    if (nameWatch) {
      setName(nameWatch)
    }
  }, [nameWatch])

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
