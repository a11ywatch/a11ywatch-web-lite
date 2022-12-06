import { ReactElement, useState } from 'react'
import { SectionContainer } from '../containers/section-container'
import { Link } from '../typo/link'
import { Header3, Header4 } from '@app/components/general/header'
import { GrPause, GrPlay } from 'react-icons/gr'
import Image from 'next/image'
import { companyName } from '@app/configs'

const infoDetails = [
  {
    title: 'Local, CI, or Remote',
    subTitle:
      'Want to host A11yWatch on your own? In one command start the project with docker or directly on the machine. Tear up or down the project in seconds with our slim binary builds or via Terraform.',
  },
  {
    title: 'Concurrent Website Testing',
    subTitle: `Get reports for thousands of pages in seconds with real browsers for WCAGA-AAA, Section508, and beyond. Get spot on results with up to 55% of all web accessibility issues handled with recommendations.`,
  },
  {
    title: 'Lightning Fast',
    subTitle:
      'Receive results with practically no downtime for your web pages across every workflow. The suite is small and powerful running on linux, macOS, and windows using native features for the cutting edge performance.',
  },
  {
    title: 'Dynamic Testing',
    subTitle:
      'Add custom sequences to evaluate your website in one location. Handle real world edge cases autonomously for any website. Determine real test flows that would occur on pages with simple no-code action builders.',
  },
]

const previewStyles = {
  width: '8px',
  display: 'inline-block',
  height: '1.25rem',
  marginLeft: '0.2rem',
  transform: 'translateY(0.2rem)',
  backgroundColor: 'rgb(160, 160, 160)',
}

export function MarketingCli(): ReactElement<any, any> | null {
  const [sampleVisible, setSample] = useState<boolean>(false)

  const toggleSample = () => {
    setSample((x) => !x)
  }

  return (
    <SectionContainer>
      <div className='ring-1 shadow-xl ring-[#0E1116] ring-offset-8 ring-offset-gray-600 py-4 px-4 rounded'>
        <div className='flex space-x-2 place-items-center'>
          <Header3>Web Accessibility CLI</Header3>
          <button
            title={
              sampleVisible
                ? 'Pause intro sample CLI video'
                : 'Watch intro sample CLI usage'
            }
            className='px-3 rounded-3xl border h-10 w-10 hover:bg-gray-200'
            onClick={toggleSample}
          >
            {sampleVisible ? (
              <GrPause className='grIcon' height={20} width={20} />
            ) : (
              <GrPlay className='grIcon' height={20} width={20} />
            )}
          </button>
        </div>
        <p className='text-lg pb-4 leading-10'>
          Run {companyName} on any machine using the Command Line Interface.
          Install the CLI in shell using the command{' '}
          <code className='text-gray-700 bg-gray-300 p-1'>
            npm i a11ywatch-cli -g
          </code>
          .
        </p>
        <div className={`flex flex-wrap gap-x-5 space-y-4 place-items-center`}>
          <div className='flex flex-1 sm:w-1/3 h-60 place-items-center'>
            <div className={`${sampleVisible ? 'block' : 'hidden'}`}>
              <Image
                src={'/img/a11ywatch_cli.gif'}
                height={494}
                width={717}
                alt={`A11yWatch CLI running the command: 'a11ywatch crawl --url https://a11ywatch.com -d -n -s > results.json' with the output 27/27 urls passing the report almost instantly.`}
                className={'h-auto w-auto rounded'}
                quality={70}
              />
            </div>
            <div
              className={`${
                sampleVisible ? 'hidden' : 'block'
              } h-full flex place-items-center md:h-initial flex-1 w-full`}
            >
              <div className={`bg-[#0E1116] rounded shadow-xl w-full`}>
                <div className='py-3 px-3 text-base lg:text-xl md:text-lg'>
                  <div className='text-gray-100'>
                    <span className='text-gray-300 select-none'>~ </span> npm i
                    a11ywatch-cli -g
                  </div>
                  <div className='text-gray-200'>
                    <span className='text-gray-300 select-none'>~ </span>{' '}
                    {`a11ywatch build && a11ywatch start`}
                  </div>
                  <div className='text-gray-300'>
                    <span className='text-gray-400 select-none'>~ </span>{' '}
                    a11ywatch crawl -u localhost:3000
                    <span style={previewStyles}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='md:w-1/2 sm:w-1/3'>
            <ul className={'text-left space-y-3'}>
              {infoDetails.map(
                (detail: { title: string; subTitle: string }, i: number) => {
                  return (
                    <li key={i}>
                      <Header4>{detail.title}</Header4>
                      <div className={'text-base'}>{detail.subTitle}</div>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className='flex py-6 place-content-center text-center'>
        <Link
          href={'https://docs.a11ywatch.com/documentation/cli/'}
          target='_blank'
          rel='referrer'
        >
          <div className='border px-4 py-2 rounded bg-[#0E1116] text-white hover:bg-gray-800 underline-none text-lg'>
            View CLI Details
          </div>
        </Link>
      </div>
    </SectionContainer>
  )
}
