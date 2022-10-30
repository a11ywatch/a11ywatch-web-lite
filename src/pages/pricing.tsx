import { MarketingDrawer, PriceMemo, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Partners } from '@app/app/marketing/partners'

function Pricing({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth={'xl'}>
      <PageTitle className={'w-3/4'}>Simple and sound pricing</PageTitle>
      <h2 className={'text-base pb-2'}>
        Plans are usage based that can be adjusted
      </h2>

      <PriceMemo navigate pricingPage />

      <div className='py-4 text-center'>
        <p>
          The accessibility scan duration is measured strictly based on the time
          it takes for the DOM to load.
        </p>
        <p>
          All scans are ran in concurrent so 30 seconds may be equal to 1 second
          in real time.
        </p>
        <p className={'text-blue-600 font-bold'}>
          The faster your website is the more uptime you get.
        </p>
      </div>

      <Partners />
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Pricing },
  {
    intercom: true,
    description:
      'Look at pricing plans to help improve accessibility for your project. Suited for small to large companies that need web accessibility assurance.',
  }
)
