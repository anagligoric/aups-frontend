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
import useTableStyles from '../style/table.style'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { useCloseableSnackbar } from '../hooks/use-closeable-snackbar-hook'
import { Client } from '../models/Client'
import { createClient, deleteClientById, getAllClient, updateClient } from '../services/ClientService'
import { CreateClientDialog } from '../dialogs/CreateClientDialog'

const Clients = () => {
  const { classes: tableClasses } = useTableStyles()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [clientsDb, setClientsDb] = useState<Client[]>([])
  const [paginationPage, setPaginationPage] = useState(0)
  const [paginationRows, setPaginationRows] = useState(10)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const [selectedClient, setSelectedClient] = useState<Client>()

  useEffect(() => {
    loadClients()
  }, [])

  function loadClients () {
    getAllClient().then((res: any) => {
      setClientsDb(res.data)
    })
  }

  function handlePaginationChange (event: unknown, newPage: number) {
    setPaginationPage(newPage)
  }

  function handleChangeRowsPerPage (event: React.ChangeEvent<HTMLInputElement>) {
    setPaginationRows(+event.target.value)
    setPaginationPage(0)
  }

  function deleteClient (client: Client) {
    setSelectedClient(client)
    setShowDeleteDialog(true)
  }

  function editClient (client: Client) {
    setSelectedClient(client)
    setShowEditDialog(true)
  }

  function handleConfirmDelete () {
    setShowDeleteDialog(false)
    deleteClientById(selectedClient?.id || -1).then(() => {
      enqueueSuccessSnackbar('Client successfully deleted')
      setShowDeleteDialog(false)
      loadClients()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmCreate (client: Client) {
    createClient(client.firstName, client.surname, client.phoneNumber, client.city, client.street, client.number).then(() => {
      enqueueSuccessSnackbar('Client successfully added')
      setShowCreateDialog(false)
      loadClients()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmEdit (client: Client) {
    updateClient(client).then(() => {
      enqueueSuccessSnackbar('Client successfully edited')
      setShowEditDialog(false)
      loadClients()
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
                    <Typography variant="h6">{'Clients'}</Typography>
                    <div className={tableClasses.header}>
                        <Tooltip title={'Add client'} onClick={() => { setShowCreateDialog(true) }}>
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
                            <TableCell>{'First name'}</TableCell>
                            <TableCell>{'Surname'}</TableCell>
                            <TableCell>{'Phone number'}</TableCell>
                            <TableCell>{'City'}</TableCell>
                            <TableCell>{'Street'}</TableCell>
                            <TableCell>{'Street Number'}</TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientsDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((client: Client) => (
                            <TableRow key={client.id} classes={{ root: 'small-row datatableRow' }}>
                                <TableCell className={tableClasses.tableRow}>{client.firstName}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{client.surname}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{client.phoneNumber}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{client.city}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{client.street}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{client.number}</TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        color="primary"
                                        title={'Edit client'}
                                        onClick={() => { editClient(client) }}
                                    >
                                        <IconButton size={'small'}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        title={'Delete client'}
                                        onClick={() => { deleteClient(client) }}
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
                                count={clientsDb.length}
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
                    text={'Are you sure you want to delete this client?'}
                    isDialogOpen={showDeleteDialog}
                />
            )}
            {showCreateDialog && (
                <CreateClientDialog
                    onConfirm={handleConfirmCreate}
                    onCancel={() => setShowCreateDialog(false)}
                    text={'New Client'}
                    isDialogOpen={showCreateDialog}
                />
            )}

            {showEditDialog && (
                <CreateClientDialog
                    onConfirm={handleConfirmEdit}
                    onCancel={() => setShowEditDialog(false)}
                    text={'Edit Client'}
                    isDialogOpen={showEditDialog}
                    selectedClient={selectedClient}
                />
            )}
        </Paper>
  )
}
export default Clients
