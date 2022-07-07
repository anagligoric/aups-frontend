
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Tool } from '../models/Tool'
import { ConfirmationDialogComponent } from '../dialogs/ConfirmationDialog'
import { getAllTools, deleteToolById } from '../services/ToolService'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import useTableStyles from '../style/table.style'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { useCloseableSnackbar } from '../hooks/use-closeable-snackbar-hook'

const Tools = () => {
  const { classes: tableClasses } = useTableStyles()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [toolsDb, setToolsDb] = useState<Tool[]>([])
  const [paginationPage, setPaginationPage] = useState(0)
  const [paginationRows, setPaginationRows] = useState(10)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedTool, setSelectedTool] = useState<Tool>()

  useEffect(() => {
    getAllTools().then((res:any) => {
      setToolsDb(res.data)
    })
  })

  function handlePaginationChange (event: unknown, newPage: number) {
    setPaginationPage(newPage)
  }

  function handleChangeRowsPerPage (event: React.ChangeEvent<HTMLInputElement>) {
    setPaginationRows(+event.target.value)
    setPaginationPage(0)
  }

  function deleteTool (tool: Tool) {
    setSelectedTool(tool)
    setShowDeleteDialog(true)
  }

  function handleConfirm () {
    setShowDeleteDialog(false)
    deleteToolById(selectedTool?.id || -1).then(() => {
      enqueueSuccessSnackbar('Tool successfully deleted')
      setShowDeleteDialog(false)
    }).catch(() =>
      enqueueErrorSnackbar('Something went wrong'))
  }

  return (
        <>
            <Header/>
            <Paper className={tableClasses.mainTable}>
                <AppBar position="static">
                    <Toolbar color="primary">
                        <Typography variant="h6">{'Tools'}</Typography>
                        <div className={tableClasses.header}>
                            <Tooltip title={'Add tool'} onClick={() => {}}>
                                <IconButton className={tableClasses.active} size="large">
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={tableClasses.tableWrapper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{'Name'}</TableCell>
                            <TableCell/>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {toolsDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((tool: Tool) => (
                            <TableRow key={tool.id} classes={{ root: 'small-row datatableRow' }}>
                                <TableCell className={tableClasses.tableRow}>{tool.name}</TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        color="primary"
                                        title={'Edit tool'}
                                        onClick={() => {}}
                                    >
                                        <IconButton size={'small'}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        title={'Delete tool'}
                                        onClick={() => { deleteTool(tool) }}
                                    >
                                        <IconButton size={'small'} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 100]}
                                count={toolsDb.length}
                                rowsPerPage={paginationRows}
                                colSpan={9}
                                page={paginationPage}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                                labelRowsPerPage={'Rows per page'}
                                onPageChange={handlePaginationChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
                {showDeleteDialog && (
                    <ConfirmationDialogComponent
                        onConfirm={handleConfirm}
                        onCancel={() => setShowDeleteDialog(false)}
                        text={'Are you sure you want to delete this tool?'}
                        isDialogOpen={showDeleteDialog}
                    />
                )}
            </Paper>

        </>
  )
}
export default Tools
