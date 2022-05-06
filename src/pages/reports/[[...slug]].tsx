import type { PageProps } from '@app/types'
import type { GetServerSideProps } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { ReportView } from '@app/components/ada'
import { metaSetter } from '@app/utils'
import { getAPIRoute } from '@app/configs/api-route'
import { codecs } from '@a11ywatch/website-source-builder'

function Reports({ name, website }: PageProps) {
  const { url, domain } = website ?? { domain: '', url: 'Not Found' }

  return (
    <Fragment>
      <Head>
        <title>{`Web Accessibility Report - ${url} | A11yWatch`}</title>
        <meta
          property='description'
          content={`A detailed web accessibility report for ${url}. The report follows ADA and WCAG specifications.`}
          key='description'
        />
      </Head>
      <MarketingDrawer title={url || name} maxWidth='xl' initClosed={true}>
        <div className='sr-only'>
          <PageTitle>{`Report: ${domain || 'page'}`}</PageTitle>
        </div>
        <ReportView website={website} disablePlayground={true} disableTabs />
      </MarketingDrawer>
    </Fragment>
  )
}

const getWebsite = async (url: string, timestamp?: string) => {
  let website
  let res = await fetch(
    `${getAPIRoute('api', true)}/get-website?q=${url}${
      timestamp ? `&timestamp=${timestamp}` : ''
    }`
  )

  if (res && res?.ok) {
    website = await res.json()
  }
  return website
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params ?? {}

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const [websiteUrl, timestamp] = Array.isArray(slug) ? slug : []
  let website
  let targetUrl = websiteUrl

  try {
    targetUrl = codecs.decipher(websiteUrl)
  } catch (e) {
    console.error(e)
  }

  try {
    website = await getWebsite(targetUrl, timestamp)
    if (!website) {
      website = await getWebsite(websiteUrl, timestamp)
    }
    // retry without timestamp. TODO: LOOK INTO TIMESTAMP INCONSISTENCIES
    if (!website) {
      website = await getWebsite(websiteUrl)
    }
  } catch (e) {
    console.error(e)
  }

  if (!website) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { website },
  }
}

export default metaSetter(
  { Reports },
  {
    gql: true,
  }
)