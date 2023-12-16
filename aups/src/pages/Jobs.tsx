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
import { Job, JobDto, JobStatus } from '../models/Job'
import { createJob, deleteJobById, getAllJobs, getMyJobs, updateJob, updateStatus } from '../services/JobService'
import { CreateJobDialog } from '../dialogs/CreateJobDialog'
import { Client } from '../models/Client'
import { getAllClient } from '../services/ClientService'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { UserDto } from '../models/User'
import { getAllTechnicians } from '../services/UserService'
import { getCurrentUserUsername } from '../services/AuthService'

interface JobsProps {
  isAdmin: boolean
}

const Jobs = (props: JobsProps) => {
  const { classes: tableClasses } = useTableStyles()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [jobsDb, setJobsDb] = useState<Job[]>([])
  const [paginationPage, setPaginationPage] = useState(0)
  const [paginationRows, setPaginationRows] = useState(10)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [availableClients, setAvailableClients] = useState<Client[]>([])
  const [availableTechnicians, setAvailableTechnicians] = useState<UserDto[]>([])

  const [selectedJob, setSelectedJob] = useState<Job>()
  const [currentUsername, setCurrentUsername] = useState(getCurrentUserUsername())

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    getAllClient().then((response) => {
      setAvailableClients(response.data)
    })
      .catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })

    getAllTechnicians().then((response) => {
      setAvailableTechnicians(response.data)
    })
      .catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUsername(getCurrentUserUsername())
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  function loadJobs () {
    if (props.isAdmin) {
      getAllJobs().then((res: any) => {
        setJobsDb(res.data)
      })
    } else {
      getMyJobs(currentUsername).then((res: any) => {
        setJobsDb(res.data)
      })
    }
  }

  function handlePaginationChange (event: unknown, newPage: number) {
    setPaginationPage(newPage)
  }

  function handleChangeRowsPerPage (event: React.ChangeEvent<HTMLInputElement>) {
    setPaginationRows(+event.target.value)
    setPaginationPage(0)
  }

  function deleteJob (job: Job) {
    setSelectedJob(job)
    setShowDeleteDialog(true)
  }

  function editJob (job: Job) {
    setSelectedJob(job)
    setShowEditDialog(true)
  }

  function handleConfirmDelete () {
    setShowDeleteDialog(false)
    deleteJobById(selectedJob?.id || -1).then(() => {
      enqueueSuccessSnackbar('Job successfully deleted')
      setShowDeleteDialog(false)
      loadJobs()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmCreate (job: JobDto) {
    createJob(job).then(() => {
      enqueueSuccessSnackbar('Job successfully added')
      setShowCreateDialog(false)
      loadJobs()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmEdit (job: JobDto, id?: number) {
    if (id) {
      updateJob(id, job).then(() => {
        enqueueSuccessSnackbar('Job successfully edited')
        setShowEditDialog(false)
        loadJobs()
      }).catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })
    }
  }

  function updateJobStatus (id: number, status: JobStatus) {
    updateStatus(id, status).then(() => {
      enqueueSuccessSnackbar('Job status successfully edited')
      loadJobs()
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
          <Typography variant="h6">{'Jobs'}</Typography>
          {props.isAdmin && (
            <div className={tableClasses.header}>
              <Tooltip title={'Add job'} onClick={() => { setShowCreateDialog(true) }}>
                <IconButton className={tableClasses.active} size="large">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={tableClasses.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{'Type'}</TableCell>
              <TableCell>{'Description'}</TableCell>
              <TableCell>{'Status'}</TableCell>
              <TableCell>{'Client'}</TableCell>
              <TableCell>{'Clients location'}</TableCell>
              <TableCell>{'Technician'}</TableCell>
              <TableCell>{'Change status'}</TableCell>
              {props.isAdmin && (
                <TableCell />
              )}
              {props.isAdmin && (
                <TableCell />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobsDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((job: Job) => (
              <TableRow key={job.id} classes={{ root: 'small-row datatableRow' }}>
                <TableCell className={tableClasses.tableRow}>{job.type}</TableCell>
                <TableCell className={tableClasses.tableRow}>{job.description}</TableCell>
                <TableCell className={tableClasses.tableRow}>{job.status === JobStatus.IN_PROGRESS ? 'IN PROGRESS' : job.status}</TableCell>
                <TableCell className={tableClasses.tableRow}>{`${job.client.firstName} ${job.client.surname}`}</TableCell>
                <TableCell className={tableClasses.tableRow}>{`${job.client.city} ${job.client.street} ${job.client.number}`}</TableCell>
                <TableCell className={tableClasses.tableRow}>{`${job.user.firstName} ${job.user.surname}`}</TableCell>
                <TableCell className={tableClasses.tableRow}>
                  <FormGroup>
                    <FormControlLabel
                      label={
                        <Typography>
                          {'In Progress'}
                        </Typography>
                      }
                      control={
                        <Checkbox
                          checked={job.status === JobStatus.IN_PROGRESS}
                          size="small"
                          disabled={job.status === JobStatus.DONE}
                          onClick={() => { updateJobStatus(job.id, JobStatus.IN_PROGRESS) }}
                        />
                      }
                    />
                    <FormControlLabel
                      label={
                        <Typography>
                          {'Done'}
                        </Typography>
                      }
                      control={
                        <Checkbox
                          checked={job.status === JobStatus.DONE}
                          size="small"
                          disabled={job.status === JobStatus.DONE || job.status === JobStatus.PENDING}
                          onClick={() => { updateJobStatus(job.id, JobStatus.DONE) }}
                        />
                      }
                    />
                  </FormGroup>
                </TableCell>

                {props.isAdmin && (
                  <TableCell className={tableClasses.tableRow}>
                    <Tooltip
                      color="primary"
                      title={'Edit job'}
                      onClick={() => { editJob(job) }}
                    >
                      <IconButton size={'small'}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}

                {props.isAdmin && (<TableCell className={tableClasses.tableRow}>
                  <Tooltip
                    title={'Delete job'}
                    onClick={() => { deleteJob(job) }}
                  >
                    <IconButton size={'small'} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>)}

              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 100]}
                count={jobsDb.length}
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
          text={'Are you sure you want to delete this job?'}
          isDialogOpen={showDeleteDialog}
        />
      )}
      {showCreateDialog && (
        <CreateJobDialog
          onConfirm={handleConfirmCreate}
          onCancel={() => setShowCreateDialog(false)}
          text={'New Job'}
          isDialogOpen={showCreateDialog}
          selectedJob={selectedJob}
          availableClients={availableClients}
          availableTechnicians={availableTechnicians}
        />
      )}

      {showEditDialog && (
        <CreateJobDialog
          onConfirm={handleConfirmEdit}
          onCancel={() => setShowEditDialog(false)}
          text={'Edit Job'}
          isDialogOpen={showEditDialog}
          selectedJob={selectedJob}
          availableClients={availableClients}
          availableTechnicians={availableTechnicians}
        />
      )}
    </Paper>
  )
}
export default Jobs
