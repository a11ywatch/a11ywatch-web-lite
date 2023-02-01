import React, { useState } from 'react'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { Header2, Header3 } from '@app/components/general/header'

// calc the basic cost of the plan
const calcCost = ({ websiteCount, siteWideApiCount }: any) => {
  let total = 0

  if (websiteCount) {
    // todo use % by to get value
    if (websiteCount <= 8) {
      total = websiteCount * 1.75
    } else if (websiteCount <= 20) {
      total = websiteCount * 1.7
    } else if (websiteCount <= 30) {
      total = websiteCount * 1.65
    } else if (websiteCount <= 40) {
      total = websiteCount * 1.6
    } else if (websiteCount <= 50) {
      total = websiteCount * 1.5
    } else if (websiteCount <= 60) {
      total = websiteCount * 1.4
    } else if (websiteCount <= 70) {
      total = websiteCount * 1.3
    } else if (websiteCount <= 80) {
      total = websiteCount * 1.2
    } else if (websiteCount <= 90) {
      total = websiteCount * 1.1
    } else if (websiteCount >= 100) {
      total = websiteCount * 1 // flat
    }
  }

  if (siteWideApiCount) {
    const apiBaseToDollar = (websiteCount || 1) * Number(siteWideApiCount / 300) // 0.0033 cents pet avg
    total = total + apiBaseToDollar
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total ? total - 0.01 : 0)
}

function CreateCalculator({ name }: PageProps) {
  const [websiteCount, setWebsiteCount] = useState<number>(8)
  const [siteWideApiCount, setSiteWideApiCount] = useState<number>(75)

  const mountlyCost = calcCost({ websiteCount, siteWideApiCount })

  const onSetWebsiteCount = (event: React.ChangeEvent<any>) => {
    setWebsiteCount(event.target.value)
  }

  const onSetSiteWideApiCount = (event: React.ChangeEvent<any>) => {
    setSiteWideApiCount(event.target.value)
  }

  return (
    <MarketingDrawer title={name} footerSpacing>
      <div className='py-2'>
        <div className='py-2 px-3 border border-blue-600 rounded text-blue-700'>
          <p>
            This calculator is no longer valid as our plans transitioned out of
            feature limiting.
          </p>
        </div>
      </div>
      <PageTitle>Calculate the plan cost</PageTitle>
      <p>See estimates on enterprise plans at the basic entry of scale.</p>
      <div className='space-y-4 py-2'>
        <div className='py-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='website-count' className='block font-bold'>
              Websites
            </label>
            <input
              type='number'
              placeholder='Number of websites'
              className='px-5 py-3 border rounded'
              id={'website-count'}
              name={'website_count'}
              value={websiteCount}
              onChange={onSetWebsiteCount}
              min={10}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='api-calls-sitewide' className='block font-bold'>
              Average page count
            </label>
            <input
              type='number'
              placeholder='Site wide API calls'
              className='px-5 py-3 border rounded'
              id={'api-calls-sitewide'}
              min={100}
              value={siteWideApiCount}
              onChange={onSetSiteWideApiCount}
            />
          </div>
        </div>
        <div className='py-4 px-4 border-t'>
          <p className='text-xl'>{companyName} enterprise estimate</p>
          <div className='flex space-x-3 place-content-between place-items-center'>
            <b className='text-lg'>Total monthly cost:</b>
            <p className='text-4xl font-bold'>{mountlyCost}</p>
          </div>
        </div>
      </div>
      <Header2>Workloads that are out of this world.</Header2>
      <p>
        The enterprise setup is ideal for users that have over 50 domains that
        need to stay accessible at all times.
      </p>
      <Header3>Go beyond limits</Header3>
      <p>
        With enterprise plans comes the abilility to get custom workflows. Build
        your product on top of our infrastructure to extend the possibilities of
        your system.
      </p>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { CreateCalculator },
  {
    title: `${companyName}: Calculator reflecting enterprise cost`,
    description: `Calculator for enterprise plans at ${companyName}. Use this to get a estimation on what your cost would look like at different levels.`,
  }
)
