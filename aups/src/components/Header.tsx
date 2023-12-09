import React, { useState } from 'react'
import { Sidebar } from './SideBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box, ButtonBase } from '@mui/material'
import useStyles from '../pages/Additional.style'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/AuthService'
import { ConfirmationDialogComponent } from '../dialogs/ConfirmationDialog'
import { HeaderUserMenu } from './HeaderUserMenu'

export const Header = () => {
  const nav = useNavigate()
  const { classes } = useStyles()
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  function onConfirm () {
    setOpenConfirmationDialog(false)
    logout()
    nav('/login')
  }

  function openSidenav () {
    setMenuOpen(true)
  }

  function closeSideNav () {
    setMenuOpen(false)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
          >
            <IconButton
              data-testid="sidebar-menu"
              onClick={openSidenav}
              size="large"
            >
              <MenuIcon />
            </IconButton>

            <ButtonBase
              onClick={() => { nav('/') }}
              focusRipple
              className={classes.logoButton}
            >
              <img src="/settings.png" className={classes.logoImage} alt="logo" />

            </ButtonBase>
            <Box flexGrow={1}>{/* whitespace */}</Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            flexShrink={0}
            justifyContent="space-between"
          >
            <HeaderUserMenu />
          </Box>
        </Toolbar>

      </AppBar>
      <Sidebar
        open={menuOpen}
        onClose={closeSideNav}
      />
      <ConfirmationDialogComponent isDialogOpen={openConfirmationDialog}
        onConfirm={onConfirm}
        onCancel={() => setOpenConfirmationDialog(false)}
        text={'Are you sure you want to logout?'}
      />
    </>
  )
}
