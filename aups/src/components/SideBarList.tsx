import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import { SidebarListItem } from './SideBarListItem'
import useStyles from '../style/SideBar.style'
import { getRole } from '../services/AuthService'
import DirectionsCar from '@mui/icons-material/DirectionsCar'
import PersonAdd from '@mui/icons-material/PersonAdd'
import WorkIcon from '@mui/icons-material/Work'
import DocumentIcon from '@mui/icons-material/DocumentScanner'

export interface SidebarListProps {
    onClose: () => void;
}

export function SidebarList (props: SidebarListProps) {
  const { classes } = useStyles()
  const [isAdmin, setIsAdmin] = useState(getRole() === 'ROLE_ADMIN')

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(getRole() === 'ROLE_ADMIN')
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  function handleClose () {
    props.onClose()
  }

  return (
        <div
            role="presentation"
            className={classes.drawer}
            onKeyDown={handleClose}
        >
            <Toolbar style={{ padding: 0 }} className={classes.toolbar}>
                <IconButton
                    onClick={handleClose}
                    color="inherit"
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
                <ListItemText className={classes.toolbarText}>{'Navigation'}</ListItemText>
            </Toolbar>
            <Divider />
            <List className={classes.menu}>
                {isAdmin && (
                    <SidebarListItem
                        closeSidebar={handleClose}
                        url={'/clients'}
                        name="Clients"
                    >
                        <GroupIcon />
                    </SidebarListItem>
                )}
                {isAdmin && (
                    <SidebarListItem
                        closeSidebar={handleClose}
                        url={'/tools'}
                        name="Tools"
                    >
                        <SettingsIcon />
                    </SidebarListItem>
                )}
                {(<SidebarListItem
                    closeSidebar={handleClose}
                    url={'/jobs'}
                    name="Jobs"
                >
                    <WorkIcon />
                </SidebarListItem>
                )}
                {isAdmin && (
                    <SidebarListItem
                        closeSidebar={handleClose}
                        url={'/vehicles'}
                        name="Vehicles"
                    >
                        <DirectionsCar />
                    </SidebarListItem>
                )}
                {isAdmin && (
                    <SidebarListItem
                        closeSidebar={handleClose}
                        url={'/users'}
                        name="Users"
                    >
                        <PersonAdd />
                    </SidebarListItem>
                )}

                <SidebarListItem
                    closeSidebar={handleClose}
                    url={'/documents'}
                    name="Documents"
                >
                    <DocumentIcon />
                </SidebarListItem>

            </List>
        </div>
  )
}
