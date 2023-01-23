import { MarketingDrawer, PaymentPlans } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Partners } from '@app/components/stateless/marketing/partners'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header } from '@app/components/general/header'
import { trialDuration } from '@app/configs/app-config'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <SectionContainer container block>
        <Header>Maintainable and easy pricing</Header>
        <h2 className={'text-base pb-2'}>
          Plans are usage based that can be adjusted at anytime and includes a{' '}
          {trialDuration} free trial.
        </h2>

        <p>
          Get detailed accessibility reports that go beyond the basics across
          all your websites. Our pricing is drastically more affordable than any
          other web accessibility SaaS.
        </p>

        <PaymentPlans pricingPage />

        <div className='py-4 text-center'>
          <p>
            The accessibility scan duration is measured strictly based on the
            time it takes for the DOM to load.
          </p>
          <p>
            Scans run concurrently, so 30 seconds may be equal to 1 second in
            real time.
          </p>
        </div>

        <Partners />
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Pricing },
  {
    description:
      'Look at pricing plans to help improve accessibility for your project. Suited for small to large companies that need web accessibility assurance.',
  }
)
