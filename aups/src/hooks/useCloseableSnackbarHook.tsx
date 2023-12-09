import { OptionsObject, useSnackbar } from 'notistack'
import React, { useEffect, useRef } from 'react'

export function useCloseableSnackbar () {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const _mounted = useRef(false)

  useEffect(() => {
    _mounted.current = true
    return () => {
      _mounted.current = false
    }
  }, [])

  const enqueueCloseableSnackbar = (message: string | React.ReactNode, options?: OptionsObject) => {
    if (_mounted.current) {
      try {
        const key = enqueueSnackbar(message, {
          ...options,
          onClick: (event: any) => {
            if (options?.onClick) {
              options.onClick(event)
            }
            closeSnackbar(key)
          }
        })
        return key
      } catch (e) {
        console.error('enqueueCloseableSnackbar() encountered an error :', e)
      }
    } else {
      console.error('A component tried to display a Snackbar notification while being unmounted!')
    }
  }
  return {
    enqueueSnackbar: enqueueCloseableSnackbar,
    enqueueSuccessSnackbar: (message: string) => enqueueCloseableSnackbar(message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } }),
    enqueueErrorSnackbar: (message: string) => enqueueCloseableSnackbar(message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } }),
    enqueueWarningSnackbar: (message: string) => enqueueCloseableSnackbar(message, { variant: 'warning', anchorOrigin: { vertical: 'top', horizontal: 'right' } }),
    closeSnackbar
  }
}
