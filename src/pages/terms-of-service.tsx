import { Mailto, MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header, Header2, Header3 } from '@app/components/general/header'

function TermsOfService({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>Terms of Service ({`"Terms"`})</Header>
        <p className='pb-2'>Last updated: November 15, 2019</p>
        <p className='pb-2 text-base'>
          Please read these Terms of Service {`("Terms", "Terms of Service")`}
          carefully before using the {strings.appName} website (the{' '}
          {`"Service"`}) operated by {strings.appName}{' '}
          {`("us", "we", or "our")`}.
        </p>
        <p className='text-base'>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users and others who access or use the Service.
        </p>
        <p className='pb-2 text-base'>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
        </p>
        <Header2>Accounts</Header2>
        <p className='text-base'>
          When you create an account with us, you must provide us information
          that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our Service.
        </p>
        <p className='text-base'>
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password, whether your password is with our Service or a third-party
          service.
        </p>
        <p className='pb-2 text-base'>
          You agree not to disclose your password to any third party. You must
          notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </p>
        <Header3>Links To Other Web Sites</Header3>
        <p className='text-base'>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by {strings.appName}.
        </p>
        <p className='text-base'>
          {strings.appName} has no control over, and assumes no responsibility
          for, the content, privacy policies, or practices of any third party
          web sites or services. You further acknowledge and agree that{' '}
          {strings.appName} shall not be responsible or liable, directly or
          indirectly, for any damage or loss caused or alleged to be caused by
          or in connection with use of or reliance on any such content, goods or
          services available on or through any such web sites or services.
        </p>
        <p className='pb-2 text-base'>
          We strongly advise you to read the terms and conditions and privacy
          policies of any third-party web sites or services that you visit.
        </p>
        <Header3>Termination</Header3>
        <p className='text-base'>
          We may terminate or suspend access to our Service immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
        </p>
        <p className='text-base'>
          All provisions of the Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
        </p>
        <p className='text-base'>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </p>
        <p className='text-base'>
          Upon termination, your right to use the Service will immediately
          cease. If you wish to terminate your account, you may simply
          discontinue using the Service.
        </p>
        <p className='pb-2 text-base'>
          All provisions of the Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
        </p>
        <Header3>Governing Law</Header3>
        <p className='text-base'>
          These Terms shall be governed and construed in accordance with the
          laws of Florida, United States, without regard to its conflict of law
          provisions.
        </p>
        <p className='pb-2 text-base'>
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service, and
          supersede and replace any prior agreements we might have between us
          regarding the Service.
        </p>
        <Header3>Changes</Header3>
        <p className='text-base'>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 30 days notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </p>
        <p className='text-base'>
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms. If you
          do not agree to the new terms, please stop using the Service.
        </p>

        <p className='pb-2 text-sm'>April 19, 2020</p>
        <p className='pb-2 text-base'>
          By signing up you have the option to receive email notifications from
          us regarding reports, updates, and other aspects that relate to
          helping improve your web accessibility. You can opt out of receiving
          email reports at any time by unsubscribing or going to the dashboard
          after signup and toggling off the alert option.
        </p>

        <Header3>Contact Us</Header3>

        <div className='text-base flex'>
          If you have any questions about these Terms, please contact us at{' '}
          <Mailto
            email='support@a11ywatch.com'
            subject='TOS'
            body='Hello, Support Team'
          >
            support@a11ywatch.com
          </Mailto>
          .
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { TermsOfService },
  {
    description:
      'Please read these Terms of Service (the “Terms”) carefully because they determine the use of our site and our services.',
  }
)
