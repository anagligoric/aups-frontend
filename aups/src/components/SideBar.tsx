import React from 'react'
import Drawer from '@mui/material/Drawer'
import { SidebarList } from './SideBarList'

export interface SidebarComponentProps {
    open: boolean;
    onClose: () => void;
}

export function Sidebar (props: SidebarComponentProps) {
  function handleClose () {
    props.onClose()
  }

  return (
        <Drawer
            anchor="left"
            open={props.open}
            onClose={handleClose}
        >
            <SidebarList onClose={handleClose} />
        </Drawer>
  )
}
