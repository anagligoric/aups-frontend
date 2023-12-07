import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 64px)', // Adjust for header height (assuming header height is 64px)
      //   backgroundColor: '#adb59f',
      padding: theme.spacing(4)
      //   height: '100vh',
      //   backgroundColor: '#adb59f',
      //   marginBottom: theme.spacing(2)

    },
    text: {
      color: '#8C6351',
      marginBottom: theme.spacing(2)
    }
  }
})

export default useStyles
