import { makeStyles } from 'tss-react/mui'
import { grey } from '@mui/material/colors'

const headerUserMenuStyle = makeStyles()(() => ({
  container: {
    '& button.userMenu': {
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: '0.010em',
      lineHeight: '20px',
      color: grey[50],
      textTransform: 'capitalize'
    }
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
  }
}))

export default headerUserMenuStyle
