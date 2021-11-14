/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'with-cookie'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { Notifications as NotificationsIcon } from '@material-ui/icons'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { ringKeyFrames } from '@app/styles'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { useStyles } from './styles'

const completeOnboarding = () => setCookie(_ONBOARDED, true)

export function Onboarding() {
  const router = useRouter()
  const classes = useStyles()
  const { setModal } = useDynamicModal()

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.iconContainer}>
          <style>{ringKeyFrames}</style>
          <NotificationsIcon fontSize='large' className={classes.ringAnimate} />
        </div>
        <Typography variant='h6' component='h3'>
          {strings.onboarding.limitEmailsTitle}
        </Typography>
        <Typography
          variant='subtitle1'
          component='p'
          className={classes.about}
          gutterBottom
        >
          {strings.onboarding.limitEmailsDetail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setModal({ open: false, onClose: completeOnboarding })
            router.push('/alerts')
            completeOnboarding()
          }}
          variant='contained'
          className={classes.normal}
        >
          Take me there
        </Button>
        <Button
          className={classes.see}
          onClick={() => {
            setModal({ open: false, onClose: completeOnboarding })
            completeOnboarding()
          }}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  )
}