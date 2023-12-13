import React, { useEffect, useState } from 'react'
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
import { useCloseableSnackbar } from '../hooks/useCloseableSnackbarHook'
import { createVehicle, deleteVehicleById, getAllVehicles, updateVehicle } from '../services/VechicleService'
import { Vehicle } from '../models/Vehicle'
import { CreateVehicleDialog } from '../dialogs/CreateVehicleDialog'

const Vehicles = () => {
  const { classes: tableClasses } = useTableStyles()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [vehiclesDb, setVehiclesDb] = useState<Vehicle[]>([])
  const [paginationPage, setPaginationPage] = useState(0)
  const [paginationRows, setPaginationRows] = useState(10)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>()

  useEffect(() => {
    loadVehicles()
  }, [])

  function loadVehicles () {
    getAllVehicles().then((res: any) => {
      setVehiclesDb(res.data)
    })
  }

  function handlePaginationChange (event: unknown, newPage: number) {
    setPaginationPage(newPage)
  }

  function handleChangeRowsPerPage (event: React.ChangeEvent<HTMLInputElement>) {
    setPaginationRows(+event.target.value)
    setPaginationPage(0)
  }

  function deleteVehicle (vehicle: Vehicle) {
    setSelectedVehicle(vehicle)
    setShowDeleteDialog(true)
  }

  function editVehicle (vehicle: Vehicle) {
    console.log(vehicle)
    setSelectedVehicle(vehicle)
    setShowEditDialog(true)
  }

  function handleConfirmDelete () {
    setShowDeleteDialog(false)
    deleteVehicleById(selectedVehicle?.id || -1).then(() => {
      enqueueSuccessSnackbar('Vehicle successfully deleted')
      setShowDeleteDialog(false)
      loadVehicles()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmCreate (vehicle: Vehicle) {
    createVehicle(vehicle.name, vehicle.status, vehicle.type).then(() => {
      enqueueSuccessSnackbar('Vehicle successfully added')
      setShowCreateDialog(false)
      loadVehicles()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmEdit (vehicle: Vehicle) {
    updateVehicle(vehicle).then(() => {
      enqueueSuccessSnackbar('Vehicle successfully edited')
      setShowEditDialog(false)
      loadVehicles()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  return (
        <Paper className={tableClasses.mainTable}>
            <AppBar position="static" >
                <Toolbar color="primary">
                    <Typography variant="h6">{'Vehicles'}</Typography>
                    <div className={tableClasses.header}>
                        <Tooltip title={'Add vehicle'} onClick={() => { setShowCreateDialog(true) }}>
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
                            <TableCell>{'Licence plate'}</TableCell>
                            <TableCell>{'Type'}</TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehiclesDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((vehicle: Vehicle) => (
                            <TableRow key={vehicle.id} classes={{ root: 'small-row datatableRow' }}>
                                <TableCell className={tableClasses.tableRow}>{vehicle.name}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{vehicle.status}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{vehicle.type}</TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        color="primary"
                                        title={'Edit vehicle'}
                                        onClick={() => { editVehicle(vehicle) }}
                                    >
                                        <IconButton size={'small'}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        title={'Delete vehicle'}
                                        onClick={() => { deleteVehicle(vehicle) }}
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
                                count={vehiclesDb.length}
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
                    text={'Are you sure you want to delete this vehicle?'}
                    isDialogOpen={showDeleteDialog}
                />
            )}
            {showCreateDialog && (
                <CreateVehicleDialog
                    onConfirm={handleConfirmCreate}
                    onCancel={() => setShowCreateDialog(false)}
                    text={'New Vehicle'}
                    isDialogOpen={showCreateDialog}
                />
            )}

            {showEditDialog && (
                <CreateVehicleDialog
                    onConfirm={handleConfirmEdit}
                    onCancel={() => setShowEditDialog(false)}
                    text={'Edit Vehicle'}
                    isDialogOpen={showEditDialog}
                    selectedVehicle={selectedVehicle}
                />
            )}
        </Paper>
  )
}
export default Vehicles
