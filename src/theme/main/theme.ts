/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createTheme } from '@material-ui/core/styles'

import { red, indigo, grey, orange } from '@material-ui/core/colors'
import { h1, h2, h6, subtitle1 } from '../common'

export const theme = (function () {
  return createTheme({
    typography: {
      fontFamily: [
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Ubuntu',
        'Cantarell',
        'Noto Sans',
        'sans-serif',
        'BlinkMacSystemFont',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ].join(','),
      button: {
        borderRadius: '2px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '0px 30px',
        color: '#fff',
        fontWeight: 600,
      },
      h3: {
        lineHeight: '1.3px',
      },
    },
    palette: {
      type: 'dark',
      primary: grey,
      secondary: indigo,
      warning: orange,
      error: red,
      background: {
        default: 'rgb(0, 0, 0)',
      },
    },
  })
})()

theme.typography.h1 = h1(theme)
theme.typography.h2 = h2(theme)
theme.typography.body1 = h6(theme)
theme.typography.h6 = h6(theme)

theme.typography.subtitle1 = subtitle1(theme)

export default theme
