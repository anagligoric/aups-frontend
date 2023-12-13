
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { ConfirmationDialogComponent } from '../dialogs/ConfirmationDialog'
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
import useTableStyles from '../style/Table.style'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { useCloseableSnackbar } from '../hooks/use-closeable-snackbar-hook'
import { Location } from '../models/Location'
import { deleteLocationById, getAllLocation } from '../services/LocationService'
import { CreateLocationDialog } from '../dialogs/CreateLocationDialog'

const Locations = () => {
  const { classes: tableClasses } = useTableStyles()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [locationsDb, setLocationsDb] = useState<Location[]>([])
  const [paginationPage, setPaginationPage] = useState(0)
  const [paginationRows, setPaginationRows] = useState(10)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const [selectedLocation, setSelectedLocation] = useState<Location>()

  useEffect(() => {
    getAllLocation().then((res:any) => {
      setLocationsDb(res.data)
    })
  }, [])

  function handlePaginationChange (event: unknown, newPage: number) {
    setPaginationPage(newPage)
  }

  function handleChangeRowsPerPage (event: React.ChangeEvent<HTMLInputElement>) {
    setPaginationRows(+event.target.value)
    setPaginationPage(0)
  }

  function deleteLocation (location: Location) {
    setSelectedLocation(location)
    setShowDeleteDialog(true)
  }

  function handleConfirmDelete () {
    setShowDeleteDialog(false)
    deleteLocationById(selectedLocation?.id || -1).then(() => {
      enqueueSuccessSnackbar('Location successfully deleted')
      setShowDeleteDialog(false)
    }).catch(() =>
      enqueueErrorSnackbar('Something went wrong'))
  }

  function handleConfirmCreate () {
    setShowCreateDialog(false)
    // TODO add logic for creation
  }

  return (
        <>
            <Header/>
            <Paper className={tableClasses.mainTable}>
                <AppBar position="static" >
                    <Toolbar color="primary">
                        <Typography variant="h6">{'Locations'}</Typography>
                        <div className={tableClasses.header}>
                            <Tooltip title={'Add location'} onClick={() => { setShowCreateDialog(true) }}>
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
                            <TableCell>{'City'}</TableCell>
                            <TableCell>{'Street'}</TableCell>
                            <TableCell>{'Number'}</TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locationsDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((location: Location) => (
                            <TableRow key={location.id} classes={{ root: 'small-row datatableRow' }}>
                                <TableCell className={tableClasses.tableRow}>{location.city}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{location.street}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{location.number}</TableCell>
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
                                        onClick={() => { deleteLocation(location) }}
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
                                count={locationsDb.length}
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
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setShowDeleteDialog(false)}
                        text={'Are you sure you want to delete this tool?'}
                        isDialogOpen={showDeleteDialog}
                    />
                )}
                {showCreateDialog && (
                    <CreateLocationDialog
                        onConfirm={handleConfirmCreate}
                        onCancel={() => setShowCreateDialog(false)}
                        text={'New Location'}
                        isDialogOpen={showCreateDialog}
                    />
                )}
            </Paper>

        </>
  )
}
export default Locations
