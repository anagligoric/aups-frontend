import React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { useNavigate, useLocation } from 'react-router-dom'

export interface SidebarListItemProps {
    url: string;
    name: string;
    closeSidebar: () => void;
    children: React.ReactElement;
}

export function SidebarListItem (props: SidebarListItemProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = pathname === props.url

  function redirect () {
    navigate(props.url)
    props.closeSidebar()
  }

  return (
        <ListItem
            button
            onClick={redirect}
            className={isActive ? 'active' : ''}
        >
            <ListItemIcon>{props.children}</ListItemIcon>
            <ListItemText>{props.name}</ListItemText>
        </ListItem>
  )
}
