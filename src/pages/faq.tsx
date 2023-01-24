import { Mailto, MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Link, LinkPrefetch } from '@app/components/stateless/typo/link'
import { companyName } from '@app/configs'

const linkStyle = {
  textDecoration: 'underline',
  fontWeight: 600,
}

function Faq({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>Frequently Asked Questions(FAQ)</Header>
        <p className='text-base pb-2'>
          Stuck on a certain problem? Check some of these common gotchas first
          in the FAQ.
        </p>

        <div
          itemScope
          itemProp='mainEntity'
          itemType='https://schema.org/Question'
        >
          <Header2 itemProp='name'>How many websites can I add?</Header2>
          <div
            itemScope
            itemProp='acceptedAnswer'
            itemType='https://schema.org/Answer'
          >
            <p className='text-base' itemProp='text'>
              Free accounts can add one domain, all paid accounts get up to 50
              domains.
            </p>
          </div>
        </div>

        <div
          itemScope
          itemProp='mainEntity'
          itemType='https://schema.org/Question'
        >
          <Header2 itemProp='name'>How can I support the project?</Header2>
          <div
            itemScope
            itemProp='acceptedAnswer'
            itemType='https://schema.org/Answer'
          >
            <p className='text-base' itemProp='text'>
              {strings.appName} allows multiple ways of contributing to the
              project. You can send BTC to the following address:{' '}
              <strong>3EBwSQdPc43CFg8YGBRy3hj9ubihbnPEKv</strong> or help spread
              the word with{' '}
              <LinkPrefetch
                rel='noopener'
                target='_blank'
                className={'text-blue-700'}
                href={'https://a11ywatch.com'}
              >
                links to a11ywatch.com
              </LinkPrefetch>
              .
            </p>
          </div>
        </div>

        <div
          itemScope
          itemProp='mainEntity'
          itemType='https://schema.org/Question'
        >
          <Header2 itemProp='name'>
            Can I upgrade or downgrade anytime I want?
          </Header2>
          <div
            itemScope
            itemProp='acceptedAnswer'
            itemType='https://schema.org/Answer'
          >
            <p className='text-base' itemProp='text'>
              Yes, upgrade and downgrades take effect immediately.
            </p>
          </div>
        </div>

        <div
          itemScope
          itemProp='mainEntity'
          itemType='https://schema.org/Question'
        >
          <Header2 itemProp='name'>Do you ever do sales or discounts?</Header2>
          <div
            itemScope
            itemProp='acceptedAnswer'
            itemType='https://schema.org/Answer'
          >
            <p className='text-base' itemProp='text'>
              Negative. The price you are seeing today or are paying in your
              account now is the best price period. {`We've`} never done any
              discounts and planning to stay that way indefinitely.
            </p>
          </div>
        </div>

        <div
          itemScope
          itemProp='mainEntity'
          itemType='https://schema.org/Question'
        >
          <Header2 itemProp='name'>How can I sign up as a company?</Header2>
          <div
            itemScope
            itemProp='mainEntity'
            itemType='https://schema.org/Question'
          >
            <p className='text-base' itemProp='text'>
              You have two main options for joining on A11yWatch as a company,
              brand or organization. Sign up from a regular user account under
              your organization{`'s`} email. You can treat the general account
              as the main account for your company. The safest way to share
              account access is through the google sign on method.
            </p>
          </div>
        </div>

        <Header3>Help Spread the Word</Header3>

        <div className='border py-2 px-3 space-y-2'>
          <p>
            Spread the word and evangelize {strings.appName}{' '}
            <Link
              style={linkStyle}
              href={'https://a11ywatch.com'}
              className={'text-blue-700'}
            >
              linking to a11ywatch.com
            </Link>{' '}
            on your website, every backlink matters. Follow us on{' '}
            <Link
              target='_blank'
              style={linkStyle}
              className={'text-blue-700'}
              href={'https://www.twitter.com/a11ywatcher'}
            >
              Twitter
            </Link>
            , like and retweet the important news. Or just talk about us with
            your friends.
          </p>
          <p>
            <b>Give us feedback.</b> Tell us what {`we're`} doing well or where
            we can improve. Please upvote (👍) the issues that you are the most
            interested in seeing solved.
          </p>
        </div>

        <div className='py-6 text-lg'>
          <div>If you have any questions, please contact us at </div>
          <Mailto
            email='support@a11ywatch.com'
            subject='TOS'
            body='Hello, Support Team'
          >
            support@a11ywatch.com
          </Mailto>
        </div>

        <p>If you still need help please contact support.</p>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Faq },
  {
    description: `Get answers to frequently asked questions on A11yWatch plans and pricing. Teams use ${companyName} to fix, monitor, and guide web accessibility in one place.`,
  }
)
