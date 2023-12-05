import { makeStyles } from 'tss-react/mui'
import { Spacing } from './spacing.constants'
import { blue, grey, green } from '@mui/material/colors'
import { Property } from 'csstype'

const useTableStyles = makeStyles()(() => ({
  mainTable: { margin: Spacing[10] },
  tableWrapper: { overflowX: 'auto' },
  head: {
    paddingTop: Spacing[5],
    paddingBottom: Spacing[5]
  },

  table: {
    borderSpacing: 0,
    borderCollapse: 'separate'
  },
  tableRow: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  tableRowColorGreen: {
    backgroundColor: green[100]
  },
  tableRowNoBorder: {
    paddingTop: 0,
    paddingBottom: 0,
    border: 'none'
  },
  tableCellNoBorder: {
    border: 'none !important',
    padding: 0
  },
  tableCellBorderRight: {
    paddingRight: '1rem',
    borderRight: `1px ${grey[300]} solid`,
    borderCollapse: 'separate'
  },
  header: {
    margin: '0 0 0 auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  addButton: {
    border: 'none',
    backgroundColor: blue[500],
    boxShadow: 'none',
    borderRadius: 0
  },
  smallRow: {
    '& td': {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  isMine: {
    '& td': {
      '& span:not(.material-icons)': {
        color: blue[400],
        fontWeight: 'bold'
      }
    }
  },
  isExpanded: { '& td': { borderBottomStyle: 'dashed' } },
  expandedRow: { padding: Spacing[1] },
  expansionWrapper: { marginLeft: Spacing[15] },
  hoverIndicator: {
    transition: 'background-color 0.2s',
    '&:hover': { backgroundColor: grey[300] }
  },
  iconLabelWrapper: {
    flexDirection: 'row-reverse !important' as Property.FlexDirection,
    paddingBottom: Spacing[2]
  },
  infoIcon: { margin: Spacing[3] },
  participantSelector: {
    color: `${grey[50]} !important`,
    '& svg': { color: `${grey[50]} !important` },
    '&::before, &:not(.Mui-disabled):hover::before': { borderColor: `${grey[50]} !important` }
  },
  notActive: { color: blue[900] },
  active: { color: 'white !important' },
  actions: { display: 'none' },
  toolbar: {
    paddingLeft: Spacing[2],
    paddingRight: Spacing[2]
  },
  cursorPointer: { cursor: 'pointer' },
  dstDoubleHourIndicator: {
    color: 'red !important'
  },
  datatableFirstColumn: {
    paddingLeft: '24px'
  },
  sellpriceLeft: {
    paddingLeft: '1em !important',
    textAlign: 'left'
  },
  disabled: {
    color: grey[200]
  }
}))

export default useTableStyles
