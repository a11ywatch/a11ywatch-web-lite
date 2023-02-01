import { useEffect } from 'react'
import Head from 'next/head'

import { LOGGIN_ROUTES } from '@app/configs'
import {
  WASMContextProvider,
  WebsiteProviderWrapper,
} from '@app/components/providers'
import { RestWebsiteProviderWrapper } from '@app/components/providers/rest/rest-website'
import type { InnerApp } from '@app/types/page'
import { buildScopeQuery } from '@app/utils/build-scope'
import { strings } from '@app/content/strings/a11y'
import { initPWAWorker } from '@app/data/models/app'
import {
  BLOG_WEBFLOW_URL,
  companyName,
  DOMAIN_NAME,
  twitterSite,
} from '@app/configs/app-config'
import { useStaticRendering as enableMobxStaticRendering } from 'mobx-react-lite'
import { SkipContent, SnackBar } from './general'
import { InteractiveProvider } from './providers/interactive'
import { AuthProvider } from './providers/auth'
import { ThemeProvider } from 'next-themes'

if (typeof window === 'undefined') {
  enableMobxStaticRendering(true)
}

const authRoutes = LOGGIN_ROUTES.map((route) => route.replace('/', ''))

// load the application with providers depending on component
export const LayoutWrapper = ({ Component, pageProps }: InnerApp) => {
  useEffect(() => {
    initPWAWorker()
  }, [])

  const { name } = Component?.meta || strings?.meta
  const { wasm, gql, rest } = Component

  // name is based off function name and not file name
  const nameLowerCased = (name && String(name).toLowerCase()) || ''

  const initialWebsiteQuery =
    authRoutes.includes(nameLowerCased) ||
    authRoutes.includes(nameLowerCased.replace(/ /g, '-'))

  // TODO: USE META TO DETERMINE PROVIDER PULLING
  const { initialQuery, scopedQuery } = buildScopeQuery(
    nameLowerCased,
    initialWebsiteQuery
  )

  return (
    <ThemeProvider attribute='class' enableSystem>
      <WASMContextProvider load={wasm}>
        <AuthProvider load={wasm || gql || rest}>
          <InteractiveProvider load={wasm || gql}>
            <WebsiteProviderWrapper
              skip={!initialQuery}
              gqlFilter={Component?.params?.filter}
              scopedQuery={scopedQuery}
              gql={gql}
            >
              <RestWebsiteProviderWrapper rest={rest}>
                <Component {...pageProps} name={name} />
              </RestWebsiteProviderWrapper>
            </WebsiteProviderWrapper>
          </InteractiveProvider>
        </AuthProvider>
      </WASMContextProvider>
    </ThemeProvider>
  )
}

export default function Layout({ Component, pageProps }: InnerApp) {
  const { description, title, name } = Component?.meta || strings?.meta
  const metaTitle = title || `${strings.appName}: Web Accessibility Service`
  const pathName = String(name).toLowerCase()
  const domainName = pathName === 'blog' ? BLOG_WEBFLOW_URL : DOMAIN_NAME

  const gimage =
    pathName === '/' || pathName === 'index'
      ? `${DOMAIN_NAME}/img/dashboard-example.png`
      : `${DOMAIN_NAME}/api/og?title=${metaTitle}`

  return (
    <>
      <Head>
        <meta charSet='utf-8' key={'charset'} />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
          key='viewport'
        />
        <title key='title'>{metaTitle}</title>
        {description ? (
          <meta name='description' content={description} key='description' />
        ) : null}
        <meta name='twitter:title' key={'twitter:title'} content={metaTitle} />
        <meta
          content='en'
          httpEquiv='Content-Language'
          key={'content-language'}
        />
        <meta
          name='twitter:card'
          content='summary_large_image'
          key={'twitter:card'}
        />
        <meta
          name='twitter:site'
          content={`@${twitterSite}`}
          key={'twitter:site'}
        />
        <meta
          name='twitter:creator'
          content={twitterSite}
          key={'twitter:creator'}
        />
        <meta name='twitter:image' content={gimage} key={'twitter:image'} />
        <meta property='og:type' key='og:type' content='website' />
        <meta
          property='og:url'
          content={`${domainName}${
            ['index', 'blog'].includes(pathName)
              ? ''
              : `/${pathName.replace(/ /g, '-')}`
          }`}
          key={'og:url'}
        />
        {description ? (
          <meta
            property='og:description'
            content={description}
            key={'og:description'}
          />
        ) : null}
        {metaTitle ? (
          <meta property='og:title' content={metaTitle} key={'og:title'} />
        ) : null}
        <meta property='og:image' content={gimage} key={'og:image'} />
        {description ? (
          <meta
            property='og:image:alt'
            content={description}
            key='og:image:alt'
          />
        ) : null}
        <meta property='og:site_name' content={companyName} />
        <meta
          content='max-snippet:-1, max-image-preview:large, max-video-preview:-1'
          name='robots'
          key={'robots'}
        ></meta>
        <meta
          property='keywords'
          key='keywords'
          content='Web Accessibility Tool, Web Accessibility API, OSS Web Accessibility, Inclusion, A11y, Web'
        />
        {process.env.NEXT_PUBLIC_DISABLE_SEO === '1' ? (
          <meta name='robots' content='noindex' key='noindex' />
        ) : null}
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='/manifest.json' key={'manifest'} />
        <meta
          name='format-detection'
          content='telephone=no'
          key={'format-detection'}
        />
        <meta
          name='apple-mobile-web-app-capable'
          content='yes'
          key={'apple-mobile-web-app-capable'}
        />
        <link
          rel='apple-touch-icon'
          href='/img/apple-touch-icon.png'
          key={'apple-touch-icon'}
        />
        <link
          rel='icon'
          type='image/x-icon'
          href='/img/favicon.ico'
          key={'image/x-icon'}
        />
      </Head>
      <SkipContent />
      <LayoutWrapper Component={Component} pageProps={pageProps} />
      {pathName === 'blog' || pathName === 'dashboard' ? null : (
        <SnackBar topLevel />
      )}
    </>
  )
}
