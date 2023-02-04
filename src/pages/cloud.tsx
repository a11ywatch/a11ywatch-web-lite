import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { companyName } from '@app/configs'
import { Link } from '@app/components/stateless/typo/link'

function Cloud({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`${companyName} Cloud`}</Header>
        <p className='text-lg pb-5'>
          The cloud infrastructure for the accessibility engine of the future.
        </p>

        <h2 className='text-xl font-bold'>
          Let us handle all of the heavy lifting
        </h2>

        <p className='text-base'>
          Our system is set to bring rich features and data that determines
          almost any edge case for developing accessible systems at unique
          variations.
        </p>

        <p>
          <Link href={'/login'} className='underline text-blue-800'>
            Login
          </Link>{' '}
          or{' '}
          <Link href={'/register'} className='underline text-blue-800'>
            register
          </Link>{' '}
          now to get started. After creating an account you can use your API key
          anywhere.
        </p>

        <div className='py-5'>
          <h3 className='text-xl font-bold'>
            Leverage our infrastructure and API
          </h3>
          <p>
            You can view our OSS projects at{' '}
            <a
              href='https://github.com/a11ywatch'
              className='underline text-blue-800'
              target={'_blank'}
              rel='noreferrer'
            >
              Github
            </a>
            .
          </p>
        </div>

        <div className='py-4'>
          <h3 className='text-xl font-bold'>
            Need to handle millions of audits per minute?
          </h3>
          <p>
            We have gRPC stream integrations that can take your system to the
            next level of speed and efficiency. Save thousands of dollars by
            taking the steps needed to use the right tools for testing on the
            cloud. Our project made several tools that brought new capabilities
            to the OSS net.{' '}
            <Link
              className='underline text-blue-800'
              href={'mailto:support@a11ywatch.com'}
            >
              Contact us
            </Link>{' '}
            if you need help integrating with your backend.
          </p>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Cloud },
  {
    title: `${companyName}: Accessibility cloud engine for the future.`,
    description: `Integrate any system into real time cutting edge inclusion handling and dedicated support across levels.`,
  }
)
