import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  dialogActions: { justifyContent: 'center' },
  noPadding: {
    padding: 0,
    backgroundColor: theme.palette.primary.light
  },
  dialogButton: {
    color: theme.palette.primary.light
  },
  borderNone: { border: 'none' }
}))
