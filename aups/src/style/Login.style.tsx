import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh - 64px',
      padding: '10px',
      paddingTop: '20%'
    },
    imgContainer: {
      textAlign: 'center',
      margin: '24px 0 12px 0'
    },
    avatar: {
      width: '15%',
      borderRadius: '50%'
    },
    appHeader: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    },
    logoButton: {
      boxSizing: 'content-box',
      position: 'relative',
      lineHeight: 0,
      float: 'none',
      justifyContent: 'center',
      left: '45%'
    },
    logoImage: {
      height: '50px',
      marginTop: '5px'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 64px)'
      // padding: Spacing[4]
    }
  }
})

export default useStyles
