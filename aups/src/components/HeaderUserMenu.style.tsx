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
  }
}))

export default headerUserMenuStyle
