import { MarketingDrawer, PaymentPlans } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header } from '@app/components/general/header'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <SectionContainer container block>
        <Header>Maintainable and easy pricing</Header>
        <h2 className={'text-base pb-2'}>
          Plans are usage based that can be adjusted up or down at anytime.
        </h2>

        <p>
          Get detailed accessibility reports that go beyond the basics across
          all your websites. Our pricing is drastically more affordable than any
          other web accessibility SaaS.
        </p>

        <PaymentPlans pricingPage />
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
