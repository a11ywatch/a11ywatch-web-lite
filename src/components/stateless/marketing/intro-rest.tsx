import { PropsWithChildren } from 'react'
import { Link } from '../typo/link'
import { SectionContainer } from '../containers/section-container'
import { IntroGraph } from './intro-graph'
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
            <>The web accessibility platform without limits</>
          )}
        </Header>
        {checker ? (
          <h2 className='text-lg py-2'>
            Test your web accessibility and vitals fast. Learn how the issue
            happened and the steps needed to remedy the fix correctly.
          </h2>
        ) : (
          <div>
            <p className='text-base '>
              A11yWatch provides powerful tools for testing web inclusivity
              correctly so you can build better software. Our system is
              constantly improving web accessibility test coverage, efficiency &
              speed, and other integrations that help productivity.
            </p>
            <p className='text-base py-1 '>
              Gain confidence across every step with robust solutions like{' '}
              <strong>automated workflows, API access, and much more</strong>.
            </p>
          </div>
        )}
        <div className='py-3 pb-4 relative'>
          <Link
            className={`px-6 py-2 rounded border tracking-wider flex place-content-center w-40 font-medium after:text-sm after:content-['Try_for_free.'] after:left-[11.2rem] after:absolute after:pointer-events-none hover:opacity-70 hover:no-underline after:font-normal`}
            href={'/register'}
          >
            Get Started
          </Link>
        </div>
        {children}
      </div>
      <div className={'flex-1 place-content-center'}>
        {checker ? <IntroSvg /> : <IntroGraph />}
      </div>
    </SectionContainer>
  )
}

export { MarketingIntro }
