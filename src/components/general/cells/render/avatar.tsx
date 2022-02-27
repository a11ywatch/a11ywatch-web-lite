import React from 'react'
import { Typography, Tooltip, ListItemAvatar, Avatar } from '@material-ui/core'
import {
  Folder as FolderIcon,
  Warning as WarningIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  adaScore: {
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    left: '1.5px',
    position: 'relative',
  },
  pulse: {
    boxShadow: `2px 1.5px ${theme.palette.secondary.main}`,
    background: 'rgb(211,211,211)',
  },
  cdnText: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
  },
}))

export function RenderAvatar({ adaScore, cdnConnected, error }: any) {
  const classes = useStyles()

  const newScore = adaScore && `${Math.max(0, adaScore.toFixed(0))}%`
  const ADASCORE = adaScore
    ? `Accessibility score ${newScore}`
    : 'Accessibility score not generated yet'

  const avatarProps = cdnConnected
    ? {
        className: classes.pulse,
      }
    : {}

  let inner = <FolderIcon />
  if (adaScore) {
    inner = (
      <Typography
        aria-label={ADASCORE}
        className={`${classes.adaScore} ${cdnConnected ? classes.cdnText : ''}`}
      >
        {newScore}
      </Typography>
    )
  }
  if (error) {
    inner = <WarningIcon />
  }
  return (
    <Tooltip
      title={`${ADASCORE} ${cdnConnected ? '- A11y CDN Connected' : ''}`}
      placement={'left'}
    >
      <ListItemAvatar>
        <Avatar {...avatarProps}>{inner}</Avatar>
      </ListItemAvatar>
    </Tooltip>
  )
}
