import React from 'react'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import { GrHelp } from 'react-icons/gr'
import type { PageProps } from '@app/types'

const PageNotFound = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>404</PageTitle>
      <div className='space-y-2 px-2'>
        <GrHelp className='grIcon text-2xl' />
        <p className='text-lg'>Page not found.</p>
        <p>If the issue continues please try again later or contact support.</p>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { PageNotFound },
  {
    description:
      'Page not found. Try checking the url, if issues persist please contact support.',
  }
)
