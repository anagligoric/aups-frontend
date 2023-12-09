import { makeStyles } from 'tss-react/mui'
import { Spacing } from './spacing.constants'

const useTableStyles = makeStyles()(() => ({
  mainTable: { margin: Spacing[10], marginTop: 100 },
  tableWrapper: { overflowX: 'auto' },
  head: {
    paddingTop: Spacing[5],
    paddingBottom: Spacing[5]
  },
  tableRow: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  header: {
    margin: '0 0 0 auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  active: { color: 'white !important' }
}))

export default useTableStyles
