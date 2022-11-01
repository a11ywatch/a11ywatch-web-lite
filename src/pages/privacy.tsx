import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle, Spacer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/app/containers/section-container'

function Privacy({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <PageTitle>Privacy Policy</PageTitle>
        <Typography variant='body1' component='p' gutterBottom>
          The data that is collected is used within our service to improve your
          experience and only that. All data is secure and safe coming from our
          service. None of the data collected from A11yWatch is being shared
          with any 3rd party service.
        </Typography>
        <Spacer height={'20px'} />
        <Typography variant='h4' component='h2' gutterBottom>
          Analytics
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          We care about your privacy and value every aspect of it. We do not
          perform any type of tracking across our services.
        </Typography>
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
