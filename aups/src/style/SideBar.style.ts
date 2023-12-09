import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  toolbar: {
    color: 'white',
    backgroundColor: '#adb59f',
    position: 'sticky',
    zIndex: 1,
    top: 0
  },
  activeElement: {
    backgroundColor: '#adb59f !important',
    opacity: 0.6,
    color: 'white !important'
  },
  toolbarText: { padding: '0 1em' },
  drawer: { width: '20em' },
  menu: { padding: 0 }
}))

export default useStyles
