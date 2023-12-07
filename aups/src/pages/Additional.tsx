import React from 'react'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import useStyles from './NotFound.style'
import { useNavigate } from 'react-router-dom'

interface AdditionalPageProps {
  title: string;
  message: string;
}

const AdditionalPage = (props: AdditionalPageProps) => {
  const { classes } = useStyles()
  const nav = useNavigate()

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.text}>
        {props.title}
      </Typography>
      <Typography variant="body1" className={classes.text}>
        {props.message}
      </Typography>
      <Button variant="contained" onClick={() => { nav('/') }}>
        Go Back Home
      </Button>
    </div>
  )
}

export default AdditionalPage
