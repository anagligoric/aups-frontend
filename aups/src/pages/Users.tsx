/* eslint-disable */

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
import { User, UserDto } from '../models/User'
import { createUser, deleteUserById, getAllRoles, getAllUser, mapRoleName, resetPassword, updateUser } from '../services/UserService'
import { CreateUserDialog } from '../dialogs/CreateUserDialog'
import { Role } from '../models/Role'

const Users = () => {
    const { classes: tableClasses } = useTableStyles()
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

    const [usersDb, setUserDb] = useState<User[]>([])
    const [paginationPage, setPaginationPage] = useState(0)
    const [paginationRows, setPaginationRows] = useState(10)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [availableRoles, setAvailableRoles] = useState<Role[]>([])

    const [selectedUser, setSelectedUser] = useState<User>()

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        getAllRoles().then((response) => {
            setAvailableRoles(response.data)
        })
            .catch((error) => {
                if (error.response.data) {
                    enqueueErrorSnackbar(error.response.data)
                } else {
                    enqueueErrorSnackbar('Something went wrong')
                }
            })
    }, [])

    function loadUsers() {
        getAllUser().then((res: any) => {
            setUserDb(res.data)
        })
    }

    function handlePaginationChange(event: unknown, newPage: number) {
        setPaginationPage(newPage)
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setPaginationRows(+event.target.value)
        setPaginationPage(0)
    }

    function deleteUser(vehicle: User) {
        setSelectedUser(vehicle)
        setShowDeleteDialog(true)
    }

    function editUser(vehicle: User) {
        setSelectedUser(vehicle)
        setShowEditDialog(true)
    }

    function handleConfirmDelete() {
        setShowDeleteDialog(false)
        deleteUserById(selectedUser?.id || -1).then(() => {
            enqueueSuccessSnackbar('User successfully deleted')
            setShowDeleteDialog(false)
            loadUsers()
        }).catch(() =>
            enqueueErrorSnackbar('Something went wrong'))
    }

    function handleConfirmCreate(user: UserDto) {
        createUser(user.firstName, user.surname, user.email, user.roleId).then(() => {
            enqueueSuccessSnackbar('User successfully added')
            setShowCreateDialog(false)
            loadUsers()
        }).catch(() =>
            enqueueErrorSnackbar('Something went wrong'))
    }

    function handleConfirmEdit(user: UserDto, id?: number) {
        if (id) {
            updateUser(id, user).then(() => {
                enqueueSuccessSnackbar('User successfully edited')
                setShowEditDialog(false)
                loadUsers()
            }).catch(() =>
                enqueueErrorSnackbar('Something went wrong'))
        }

    }

    return (
        <Paper className={tableClasses.mainTable}>
            <AppBar position="static" >
                <Toolbar color="primary">
                    <Typography variant="h6">{'Users'}</Typography>
                    <div className={tableClasses.header}>
                        <Tooltip title={'Add User'} onClick={() => { setShowCreateDialog(true) }}>
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
                            <TableCell>{'Email'}</TableCell>
                            <TableCell>{'Role'}</TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((user: User) => (
                            <TableRow key={user.id} classes={{ root: 'small-row datatableRow' }}>
                                <TableCell className={tableClasses.tableRow}>{user.firstName}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{user.surname}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{user.email}</TableCell>
                                <TableCell className={tableClasses.tableRow}>{mapRoleName(user.role.name)}</TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        color="primary"
                                        title={'Edit user'}
                                        onClick={() => { editUser(user) }}
                                    >
                                        <IconButton size={'small'}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className={tableClasses.tableRow}>
                                    <Tooltip
                                        title={'Delete user'}
                                        onClick={() => { deleteUser(user) }}
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
                                count={usersDb.length}
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
                    text={'Are you sure you want to delete this user?'}
                    isDialogOpen={showDeleteDialog}
                />
            )}
            {showCreateDialog && (
                <CreateUserDialog
                    onConfirm={handleConfirmCreate}
                    onCancel={() => setShowCreateDialog(false)}
                    text={'New User'}
                    isDialogOpen={showCreateDialog}
                    availableRoles={availableRoles}
                />
            )}

            {showEditDialog && (
                <CreateUserDialog
                    onConfirm={handleConfirmEdit}
                    onCancel={() => setShowEditDialog(false)}
                    text={'Edit user'}
                    isDialogOpen={showEditDialog}
                    selectedUser={selectedUser}
                    availableRoles={availableRoles}
                />
            )}
        </Paper>
    )
}
export default Users
