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
import { Document } from '../models/Document'
import { Job } from '../models/Job'
import { createDocument, deleteDocumentById, getAllDocuments, getMyDocuments, updateDocument } from '../services/DocumentService'
import { CreateDocumentDialog } from '../dialogs/CreateDocumentDialog'
import { getAllJobs, getMyJobs } from '../services/JobService'
import moment from 'moment'
import { getAllVehicles } from '../services/VechicleService'
import { Vehicle } from '../models/Vehicle'
import { Tool } from '../models/Tool'
import { getAllTools } from '../services/ToolService'
import { getCurrentUserUsername } from '../services/AuthService'

interface DocumentProps {
  isAdmin: boolean;
}
const Documents = (props: DocumentProps) => {
  const { classes: tableClasses } = useTableStyles()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [documentsDb, setDocumentsDb] = useState<Document[]>([])
  const [paginationPage, setPaginationPage] = useState(0)
  const [paginationRows, setPaginationRows] = useState(10)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [availableJobs, setAvailableJobs] = useState<Job[]>([])
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([])
  const [availableTools, setAvailableTools] = useState<Tool[]>([])

  const [selectedDocument, setSelectedDocument] = useState<Document>()
  const [currentUsername, setCurrentUsername] = useState(getCurrentUserUsername())

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    if (props.isAdmin) {
      getAllJobs().then((response) => {
        setAvailableJobs(response.data)
      })
        .catch((error) => {
          if (error.response.data) {
            enqueueErrorSnackbar(error.response.data)
          } else {
            enqueueErrorSnackbar('Something went wrong')
          }
        })
    } else {
      getMyJobs(currentUsername).then((response) => {
        setAvailableJobs(response.data)
      })
        .catch((error) => {
          if (error.response.data) {
            enqueueErrorSnackbar(error.response.data)
          } else {
            enqueueErrorSnackbar('Something went wrong')
          }
        })
    }

    getAllVehicles().then((response) => {
      setAvailableVehicles(response.data)
    })
      .catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })
    getAllTools().then((response) => {
      setAvailableTools(response.data)
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

  function loadDocuments () {
    if (props.isAdmin) {
      getAllDocuments().then((res: any) => {
        setDocumentsDb(res.data)
      })
    } else {
      getMyDocuments(getCurrentUserUsername()).then((res: any) => {
        setDocumentsDb(res.data)
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

  function deleteDocument (document: Document) {
    setSelectedDocument(document)
    setShowDeleteDialog(true)
  }

  function editDocument (document: Document) {
    setSelectedDocument(document)
    setShowEditDialog(true)
  }

  function handleConfirmDelete () {
    setShowDeleteDialog(false)
    deleteDocumentById(selectedDocument?.id || -1).then(() => {
      enqueueSuccessSnackbar('Document successfully deleted')
      setShowDeleteDialog(false)
      loadDocuments()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmCreate (document: Document) {
    createDocument(document).then(() => {
      enqueueSuccessSnackbar('Document successfully added')
      setShowCreateDialog(false)
      loadDocuments()
    }).catch((error) => {
      if (error.response.data) {
        enqueueErrorSnackbar(error.response.data)
      } else {
        enqueueErrorSnackbar('Something went wrong')
      }
    })
  }

  function handleConfirmEdit (document: Document, id?: number) {
    if (id) {
      updateDocument(id, document).then(() => {
        enqueueSuccessSnackbar('Document successfully edited')
        setShowEditDialog(false)
        loadDocuments()
      }).catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })
    }
  }

  return (
    <Paper className={tableClasses.mainTable}>
      <AppBar position="static" >
        <Toolbar color="primary">
          <Typography variant="h6">{'Documents'}</Typography>
          <div className={tableClasses.header}>
            <Tooltip title={'Add document'} onClick={() => { setShowCreateDialog(true) }}>
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
              <TableCell>{'Document Number'}</TableCell>
              <TableCell>{'Creation date'}</TableCell>
              <TableCell>{'Price'}</TableCell>
              <TableCell>{'Job description'}</TableCell>
              <TableCell>{'Vehicle'}</TableCell>
              <TableCell>{'Tools'}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {documentsDb.slice(paginationPage * paginationRows, paginationPage * paginationRows + paginationRows).map((document: Document) => (
              <TableRow key={document.id} classes={{ root: 'small-row datatableRow' }}>
                <TableCell className={tableClasses.tableRow}>{document.number}</TableCell>
                <TableCell className={tableClasses.tableRow}>{moment(document.creationDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell className={tableClasses.tableRow}>{document.price}</TableCell>
                <TableCell className={tableClasses.tableRow}>{document.job.description}</TableCell>
                <TableCell className={tableClasses.tableRow}>{document.vehicle.licencePlate}</TableCell>

                <TableCell className={tableClasses.tableRow}>{document.tools.map(tool => (<div key={tool.id}>{tool.name}</div>))}</TableCell>

                <TableCell className={tableClasses.tableRow}>
                  <Tooltip
                    color="primary"
                    title={'Edit document'}
                    onClick={() => { editDocument(document) }}
                  >
                    <IconButton size={'small'}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell className={tableClasses.tableRow}>
                  <Tooltip
                    title={'Delete document'}
                    onClick={() => { deleteDocument(document) }}
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
                count={documentsDb.length}
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
          text={'Are you sure you want to delete this document?'}
          isDialogOpen={showDeleteDialog}
        />
      )}
      {showCreateDialog && (
        <CreateDocumentDialog
          onConfirm={handleConfirmCreate}
          onCancel={() => setShowCreateDialog(false)}
          text={'New Document'}
          isDialogOpen={showCreateDialog}
          selectedDocument={selectedDocument}
          availableJobs={availableJobs}
          availableVehicles={availableVehicles}
          availableTools={availableTools}
        />
      )}

      {showEditDialog && (
        <CreateDocumentDialog
          onConfirm={handleConfirmEdit}
          onCancel={() => setShowEditDialog(false)}
          text={'Edit Document'}
          isDialogOpen={showEditDialog}
          selectedDocument={selectedDocument}
          availableJobs={availableJobs}
          availableVehicles={availableVehicles}
          availableTools={availableTools}
        />
      )}
    </Paper>
  )
}
export default Documents
