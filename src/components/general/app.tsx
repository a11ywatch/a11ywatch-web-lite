import React, { useEffect, Fragment, memo } from 'react'
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { initAppModel, userModel } from '@app/data'
import { LOGGIN_ROUTES } from '@app/configs'
import { ping, startIntercom } from '@app/utils'
import { WebsiteProviderWrapper } from '@app/components/providers'
import { RestWebsiteProviderWrapper } from '../providers/rest/rest-website'
import { ErrorBoundary, SkipContent } from '@app/components/general'
import type { InnerApp } from '@app/types/page'
import { SnackBar } from './snack-bar'
// import Script from 'next/script'

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

// const CRISP_WEBSITE_ID = process.env.CRISP_WEBSITE_ID

const Application = ({ Component, pageProps, name }: InnerApp) => {
  // name is based off function name and not file name
  const nameLowerCased = (name && String(name).toLowerCase()) || ''

  const initialWebsiteQuery =
    authRoutes.includes(nameLowerCased) ||
    authRoutes.includes(nameLowerCased.replace(/ /g, '-'))

  // TODO: USE META TO DETERMINE PROVIDER PULLING
  let initialQuery = initialWebsiteQuery
  let scopedQuery = ''

  // run query without pages
  if (nameLowerCased === 'issues') {
    initialQuery = false
    scopedQuery = 'issues'
  }
  if (nameLowerCased === 'pages') {
    initialQuery = false
    scopedQuery = 'pages'
  }
  if (nameLowerCased === 'actions') {
    initialQuery = false
    scopedQuery = 'actions'
  }
  if (nameLowerCased === 'analytics') {
    initialQuery = false
    scopedQuery = 'analytics'
  }
  if (nameLowerCased === 'scripts') {
    initialQuery = false
    scopedQuery = 'scripts'
  }

  // Restful provider for API [Good for marketing sections]
  const RestWrapper = Component.rest ? RestWebsiteProviderWrapper : Fragment

  // gQL provider for API
  const GqlWrapper = Component.gql
    ? ({ children }: { children: any }) => {
        return (
          <WebsiteProviderWrapper
            skip={!initialQuery}
            gqlFilter={Component?.params?.filter}
            scopedQuery={scopedQuery}
          >
            {children}
          </WebsiteProviderWrapper>
        )
      }
    : Fragment

  return (
    <GqlWrapper>
      <RestWrapper>
        <Component {...pageProps} name={name} />
      </RestWrapper>
    </GqlWrapper>
  )
}

const MemoApp = memo(Application)

export function MyApp({ Component, pageProps }: InnerApp) {
  const { description, title, name } = Component?.meta || strings?.meta

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    initAppModel()
    userModel.initModel({
      cookie:
        typeof navigator !== 'undefined' &&
        typeof document !== 'undefined' &&
        navigator.cookieEnabled &&
        document.cookie,
    })

    // TODO: look into middleware initial request handler
    queueMicrotask(ping)
  }, [])

  useEffect(() => {
    if (Component.intercom) {
      startIntercom()
    }
  }, [Component.intercom])

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title key='title'>{title}</title>
        <meta name='description' content={description} key='description' />
        <meta property='og:description' content={description} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SkipContent />
        <ErrorBoundary>
          <MemoApp Component={Component} pageProps={pageProps} name={name} />
        </ErrorBoundary>
        <SnackBar />
      </ThemeProvider>
      {/* {!Component.intercom && CRISP_WEBSITE_ID ? (
        <Script>{`window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>
      ) : null} */}
    </Fragment>
  )
}
