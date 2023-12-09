import React, { useEffect, useState } from 'react'
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { getCurrentUser, logout } from '../services/AuthService'
import Person from '@mui/icons-material/Person'
import headerUserMenuStyle from './HeaderUserMenu.style'
import Lock from '@mui/icons-material/Lock'
import ExitToApp from '@mui/icons-material/ExitToApp'
import { ConfirmationDialogComponent } from '../dialogs/ConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { ResetPasswordDialog } from '../dialogs/ResetPasswordDialog'
import { resetPassword } from '../services/UserService'
import { ResetPassword } from '../models/ResetPassword'
import { useCloseableSnackbar } from '../hooks/use-closeable-snackbar-hook'

export const HeaderUserMenu = () => {
  const { classes } = headerUserMenuStyle()
  const nav = useNavigate()
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCloseableSnackbar()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [resetPasswordDialogIsOpen, setResetPasswordDialogIsOpen] = useState(false)
  const [logoutDialogIsOpen, setLogoutDialogIsOpen] = useState(false)

  const userMenuItems = [
    {
      icon: <Lock />,
      label: 'Reset Password',
      onClick: toggleChangePassword
    },
    {
      icon: <ExitToApp />,
      label: 'Logout',
      onClick: toggleLogout
    }
  ]

  useEffect(() => {
    return () => {
      setAnchorEl(null)
      setLogoutDialogIsOpen(false)
      setResetPasswordDialogIsOpen(false)
    }
  }, [])

  function toggleLogout () {
    setLogoutDialogIsOpen(!logoutDialogIsOpen)
    handleCloseMenu()
  }

  function toggleChangePassword () {
    setResetPasswordDialogIsOpen(!resetPasswordDialogIsOpen)
    handleCloseMenu()
  }

  function handleLogout () {
    toggleLogout()
    logout()
    nav('/login')
  }

  function handleResetPassword (resetPasswordData: ResetPassword) {
    toggleChangePassword()

    resetPassword(resetPasswordData)
      .then(() => { enqueueSuccessSnackbar('Password successfully updated') })
      .catch((error) => {
        if (error.response.data) {
          enqueueErrorSnackbar(error.response.data)
        } else {
          enqueueErrorSnackbar('Something went wrong')
        }
      })
  }

  function handleOpenMenu (e: { currentTarget: HTMLButtonElement }) {
    setAnchorEl(e.currentTarget)
  }
  function handleCloseMenu () {
    setAnchorEl(null)
  }

  return (
        <>
            {getCurrentUser() && (
                <div className={classes.container}>
                    <Button
                        data-testid="user-menu-button"
                        className="userMenu"
                        onClick={handleOpenMenu}
                    >
                        <span>{getCurrentUser() || ''}</span>
                        <Person />
                    </Button>
                    <Menu
                        id="user-menu-test-id"
                        data-testid="user-menu-test-id"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right'
                        }}
                        open={!!anchorEl}
                        onClose={handleCloseMenu}
                    >
                        {userMenuItems.map((menuItem) => (
                            <div key={menuItem.label}>
                                <MenuItem
                                    onClick={menuItem.onClick}
                                >
                                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                    <ListItemText>{menuItem.label}</ListItemText>
                                </MenuItem>
                                {/* {menuItem.label === 'Reset Password' && <Divider />} */}
                            </div>
                        ))}
                    </Menu>
                </div>)}
            <ConfirmationDialogComponent isDialogOpen={logoutDialogIsOpen}
                onConfirm={handleLogout}
                onCancel={() => setLogoutDialogIsOpen(false)}
                text={'Are you sure you want to logout?'}
            />
            <ResetPasswordDialog text='Reset Password' onConfirm={handleResetPassword} isDialogOpen={resetPasswordDialogIsOpen} onCancel={toggleChangePassword} />
        </>
  )
}
