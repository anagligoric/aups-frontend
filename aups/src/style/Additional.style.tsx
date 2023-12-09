import { makeStyles } from 'tss-react/mui'
import { Spacing } from './spacing.constants'

const useStyles = makeStyles()(() => {
  return {
    appHeader: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 64px)',
      padding: Spacing[4]
    },
    text: {
      color: '#8C6351',
      marginBottom: Spacing[2]
    }
  }
})

export default useStyles
