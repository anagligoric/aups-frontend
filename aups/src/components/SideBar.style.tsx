import { grey } from '@mui/material/colors'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  toolbar: {
    color: 'white',
    position: 'sticky',
    padding: '0 0.25em',
    zIndex: 1,
    top: 0
  },
  toolbarText: { padding: '0 1em' },
  close: { color: 'white' },
  drawer: { width: '20em' },
  version: {
    position: 'relative',
    bottom: 0,
    color: grey[600],
    fontSize: '10pt',
    paddingTop: '5pt',
    paddingLeft: '10pt'
  },
  menu: { padding: 0 }
}))

export default useStyles
