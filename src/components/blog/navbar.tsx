/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment, memo } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { Link } from '../general/link'
import { TranslateBadge } from '../badges'
import { SmallLogo } from '../general'
import { theme as appTheme } from '@app/theme/main'

const useStyles = makeStyles((theme) => ({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    color: theme.palette.background.default,
    overflow: 'hidden',
    zIndex: 1,
    ...theme.mixins.toolbar,
  },
  menu: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  transparent: {
    background: 'transparent',
    boxShadow: 'none',
  },
  menuBar: {
    display: 'flex',
    marginRight: 6,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hideShadow: {
    boxShadow: 'none',
  },
  ghIcon: {
    marginLeft: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  toolbarInnerContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
}))

const NavBarComponent = ({
  title = strings.appName,
  className,
  position = 'relative',
  component = 'nav',
}: any) => {
  const classes = useStyles()

  return (
    <Fragment>
      <div
        style={{ background: appTheme.palette.background.default }}
        className='p-4'
      >
        <a href='https://a11ywatch.com'>Back to A11ywatch.com</a>
      </div>
      <AppBar
        position={position}
        className={`${className} ${classes.container} ${classes.hideShadow}`}
        component={component}
      >
        <Toolbar>
          <div className={classes.toolbarInnerContainer}>
            <Link
              className={`${classes.menu} space-x-2 align-items-center text-normal text-black`}
              href={'/blog'}
            >
              <SmallLogo className={'invert'} />
              <h1
                style={{
                  fontSize: 16,
                  fontFamily: appTheme.typography.fontFamily,
                }}
              >
                {title}
              </h1>
            </Link>
          </div>
          <TranslateBadge className={classes.ghIcon} />{' '}
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export const NavBar = memo(NavBarComponent)