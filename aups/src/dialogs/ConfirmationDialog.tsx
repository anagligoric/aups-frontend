import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material//Button'
import { useStyles } from './confirmation-dialog.style'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import DialogContentText from '@mui/material/DialogContentText'

export interface ConfirmationDialogComponentProps {
    isDialogOpen: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    text: string;
    title?: string;
    loading?: boolean;
    yesButtonText?: string;
    noButtonText?: string;
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
        <Dialog fullWidth={false} open={props.isDialogOpen} onClose={handleCancel} data-testid="confirmation-dialog">
            <DialogTitle classes={{ root: 'no-padding' }}>
                <AppBar position="static" elevation={1}>
                    <Toolbar className={classes.noPadding} color="primary">{props.title || props.text}</Toolbar>
                </AppBar>
            </DialogTitle>

            {props.title && (
                <DialogContent>
                    <DialogContentText component={'span'}>
                        <p>{props.text}</p>
                    </DialogContentText>
                </DialogContent>
            )}

            {!!props.loading && <LinearProgress />}
            <DialogActions className={classes.dialogActions}>
                <Button
                    onClick={handleConfirm}
                    disabled={!!props.loading}
                    variant="text"
                    autoFocus
                    data-testid="yes-button"
                >
                    {props.yesButtonText || 'Yes'}
                </Button>
                {props.onCancel && (
                    <Button onClick={props.onCancel} disabled={!!props.loading} variant="text" data-testid="no-button">
                        {props.noButtonText || 'No'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
  )
}
