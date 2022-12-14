import { PropsWithChildren } from 'react'
import { Link } from '../typo/link'
import { SectionContainer } from '../containers/section-container'
import { IntroBenches } from './intro-benches'
import { IntroSvg } from '../../svgs/intro'
import { Header } from '@app/components/general/header'

interface MarketingIntro {
  checker?: boolean
}
function MarketingIntro({
  checker,
  children,
}: PropsWithChildren<MarketingIntro>) {
  return (
    <SectionContainer container>
      <div className={'flex-1 pb-4'}>
        <Header>
          {checker ? (
            'Open Source Web Accessibility Platform'
          ) : (
            <>The open source web accessibility tool built for scale.</>
          )}
        </Header>
        {checker ? (
          <h2 className='text-lg py-2'>
            Test your web accessibility and vitals fast. Learn how the issue
            happened and the steps needed to remedy the fix correctly.
          </h2>
        ) : (
          <div>
            <p className='text-base text-gray-800'>
              A11ywatch provides powerful tools for testing web inclusivity
              swiftly so you can build better software. We created a smart
              safeguard that prevents drastic issues across your websites
              without hurting SEO and without overlays.
            </p>
            <p className='text-base py-1 text-gray-700'>
              Gain confidence across every step with multiple areas of entry
              like{' '}
              <strong>embed scripts, automated solutions, API, and more</strong>
              . Add custom actions and authentication for different use cases
              easy.
            </p>
          </div>
        )}
        <div className='py-3 pb-4 relative'>
          <Link
            className={`px-6 py-2 rounded border tracking-wider flex place-content-center w-40 font-medium after:text-sm after:content-['Try_for_free.'] after:left-[11.2rem] after:absolute after:pointer-events-none hover:bg-gray-100 hover:no-underline after:font-normal after:text-gray-600`}
            href={'/register'}
          >
            Get Started
          </Link>
        </div>
        {children}
      </div>
      <div className={'flex-1 place-content-center'}>
        {checker ? <IntroSvg /> : <IntroBenches />}
      </div>
    </SectionContainer>
  )
}

export { MarketingIntro }