/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'

import React, { useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { twitterSite } from '@app-config'
import { WithSnackBar, WithSkipContent } from '@app/components/adhoc'
import { initAppModel, userModel } from '@app/data'
import { DOMAIN_NAME } from '@app/configs'
import { startIntercom } from '@app/utils'
import { withApollo } from '@app/apollo'
import { withWebsite } from '@app/components/providers'

interface MergedApp extends AppProps {
  Component: AppProps['Component'] & {
    meta: any
  }
}

function MyApp({ Component, pageProps }: MergedApp) {
  const { events } = useRouter()

  useEffect(() => {
    const handleRoutes = (route?: string) => userModel.handleRoutes(route)

    initAppModel()
    // log initial page view
    handleRoutes()
    startIntercom()

    events.on('routeChangeComplete', handleRoutes)

    return () => {
      events.off('routeChangeComplete', handleRoutes)
    }
  }, [events])

  const meta = Component?.meta || strings?.meta
  const { description, title, name } = meta

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
        <meta name='description' content={description} />
        <meta name='theme-color' content={theme.palette.primary.main} />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='./static/manifest.json' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content={twitterSite} />
        <meta
          property='twitter:image'
          content={`${DOMAIN_NAME}/static/img/intro-poster.png`}
        />
        <meta
          property='og:title'
          content={`Web Accessibility | ${strings.appName}`}
        />
        <meta property='og:url' content={DOMAIN_NAME} />
        <meta
          property='og:image'
          content={`${DOMAIN_NAME}/static/img/intro-poster.png`}
        />
        <meta property='og:description' content={description} />
        <link rel='apple-touch-icon' href='./static/img/favicon-small.png' />
        <link rel='icon' type='image/x-icon' href='./static/img/favicon.png' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WithSkipContent />
        <Component {...pageProps} name={name} />
        <WithSnackBar />
      </ThemeProvider>
    </Fragment>
  )
}

export default withApollo(withWebsite(MyApp))
