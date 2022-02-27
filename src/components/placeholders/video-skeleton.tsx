import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '-16.1vh',
    width: '100%',
    borderRadius: 4,
    minHeight: '55vh',
    paddingBottom: '44.818182%',
    backgroundColor: theme.palette.divider,
    [theme.breakpoints.down('sm')]: {
      minHeight: '45vh',
      marginTop: '-9vh',
    },
  },
}))

export function VideoSkeleton() {
  const classes = useStyles()

  return <Skeleton className={classes.card} />
}
