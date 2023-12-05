import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material//Button'
import { useStyles } from './dialog.style'

export interface ConfirmationDialogComponentProps {
    isDialogOpen: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    text: string;
}

export function ConfirmationDialogComponent (props: ConfirmationDialogComponentProps) {
  function handleConfirm () {
    props.onConfirm()
  }

  function handleCancel (e: React.MouseEvent, reason: string) {
    if (reason !== 'backdropClick' && props.onCancel) {
      props.onCancel()
    }
  }

  const { classes } = useStyles()

  return (
        <Dialog fullWidth={false} open={props.isDialogOpen} onClose={handleCancel} data-testid="confirmation-dialog" classes={{ root: 'no-padding' }}>
            <DialogTitle classes={{ root: 'no-padding' }}>
                <AppBar position="static" elevation={1} classes={{ root: 'no-padding' }}>
                    <Toolbar className={classes.noPadding}>{props.text}</Toolbar>
                </AppBar>
            </DialogTitle>

            <DialogActions className={classes.dialogActions}>
                <Button
                    onClick={handleConfirm}
                    variant="text"
                    data-testid="yes-button"
                >
                    {'Yes'}
                </Button>
                {props.onCancel && (
                    <Button onClick={props.onCancel} variant="text" data-testid="no-button" className={classes.dialogButton} color={'primary'}>
                        {'No'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
  )
}
