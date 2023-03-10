import React from 'react'
import { MarketingDrawer, PageTitle, Spacer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header2, Header3 } from '@app/components/general/header'
import { Link } from '@app/components/stateless/typo/link'

function Privacy({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <PageTitle>Privacy Policy</PageTitle>
        <p className='text-base'>
          The data that is collected is used within our service to improve your
          experience and only that. All data is secure and safe coming from our
          service. None of the data collected from A11yWatch is being shared
          with any 3rd party service.
        </p>
        <Spacer height={'20px'} />
        <Header2>Privacy Respected Analytics</Header2>
        <p className='text-base'>
          We care about your privacy and value every aspect of it. We do not
          perform any type of tracking across our services. Learn more about our{' '}
          <Link href={'https://usefathom.com/ref/ISNKKY'} target='_blank'>
            privacy focused analytics service
          </Link>{' '}
          and try it out for yourself.
        </p>
        <div className='py-2'>
          <Header3>Data Security</Header3>
          <p>
            We are not in the business to sell data. All data used ever on the
            platform is for improving your quality of the service provided.
          </p>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Privacy },
  {
    description:
      'This Privacy Policy applies to personal information processed by us in our business, including (e.g., a11ywatch.com.',
  }
)
