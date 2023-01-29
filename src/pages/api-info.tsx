import React, { useState } from 'react'
import { Button, MarketingDrawer } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { UserManager, AppManager } from '@app/managers'
import { useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import { GrCopy } from 'react-icons/gr'
import { companyName } from '@app/configs'
import { apiRoutes } from '@app/templates/rest-api'
import { ApiCell } from '@app/components/general/cells/api-info-cell'
import { Header } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { APIInfoBlock } from '@app/components/general/blocks/api-info'

// TODO: GENERATE DOCS FROM API
function ApiInfo() {
  const [keyVisible, setKey] = useState<boolean>(false)
  const { data, loading } = useUserData()
  const { user } = data ?? { user: null }

  const toggleKey = () => setKey((c) => !c)

  const copyText =
    (text: string) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      e?.preventDefault()
      navigator.clipboard.writeText(text)
      AppManager.toggleSnack(true, `Copied: ${text}`, 'success')
    }

  // token
  const token = UserManager.token
  const authed = !!user

  return (
    <MarketingDrawer authenticated={authed} loading={loading}>
      <SectionContainer container block>
        <Header>Web Accessibility API</Header>
        <div className='container mx-auto'>
          <Box>
            <h2 className={'text-lg pb-4'}>
              The free web accessibility API built to handle large workloads.
            </h2>
            <p className='text-lg'>
              In order to get started using the A11yWatch API you need to add
              your authorization header with the JWT format <b>Bearer TOKEN</b>.
            </p>
            <p className='text-lg'>
              For more information go to the{' '}
              <a
                href={
                  'https://github.com/A11yWatch/a11ywatch/tree/main/clients'
                }
                className='no-underline text-blue-600'
              >
                OpenAPI
              </a>
              ,{' '}
              <a href={'/playground'} className='no-underline text-blue-600'>
                GraphQL
              </a>
              , or{' '}
              <a href={'/grpc-docs'} className='no-underline text-blue-600'>
                gRPC
              </a>{' '}
              documentation.
            </p>
            {!data?.user && loading ? (
              <TextSkeleton className={'p-2'} />
            ) : data?.user ? (
              <div className='py-2 space-y-1'>
                <span id='toggle-key' className='sr-only'>
                  Toggle the visibility of your authentication token
                </span>
                <Button
                  type='button'
                  onClick={toggleKey}
                  aria-labelledby={'togle-key'}
                  className={'px-6 py-2'}
                >
                  {`${keyVisible ? 'Hide' : 'Show'} API Token`}
                </Button>
                <div
                  className={`py-2 relative pr-12 ${
                    keyVisible ? 'block' : 'hidden'
                  }`}
                >
                  <div className='absolute right-2'>
                    <span id='copy-text' className='sr-only'>
                      Copy your authentication token to clipboard
                    </span>
                    <button
                      className='p-3 rounded-3xl bg-[rgba(30,30,30,0.2)] shadow-xl hover:bg-blue-300'
                      aria-labelledby='copy-text'
                      onClick={copyText(token)}
                    >
                      <GrCopy title='Copy to clipboard' />
                    </button>
                  </div>
                  <p className='line-clamp-3 max-w-[90vw]'>{token}</p>
                </div>
              </div>
            ) : null}
          </Box>

          <div className='py-2'>
            <APIInfoBlock user={user} />
          </div>

          <Box>
            <ul className='space-y-3 py-2'>
              {apiRoutes.map((ro, i: number) => {
                return (
                  <li key={ro.title} id={ro.id}>
                    <div className='py-4'>
                      <div className='py-2 pr-4 pl-1 md:pl-2 text-[#0E1116] border-l-4 border-[#0E1116] rounded dark:text-white dark:border-white'>
                        <h3 className='text-2xl md:text-2xl font-bold'>
                          <a href={`#${ro.id}`}>{ro.title}</a>
                        </h3>
                      </div>
                    </div>
                    <ul className='space-y-3 py-2'>
                      {ro.routes.map((route: any, ii: number) => {
                        const routeKey = `api-info-route-${i}-${ii}`

                        return (
                          <ApiCell
                            key={routeKey}
                            token={token}
                            route={route}
                            keyVisible={keyVisible}
                            id={routeKey}
                          />
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </Box>

          <div className='border-2 rounded inline-block px-4 py-2'>
            <p className='text-grey-600 text-base'>
              By default, the {companyName} API docs demonstrate using curl to
              interact with the API over HTTP. Most routes allow params to be
              sent from the url or the body. It{`'`}s best to stick to using the
              body for PUTS and POST request since some params are set to be
              arrays and other none string shapes. In the example replace
              a11ywatch.com with the website you want to target. Using{' '}
              {companyName}
              on the CI to up keep accessibility will save thousands - millions
              of dollars of machine uptime and developer uptime due to speed and
              efficiency. We can process over 15,000 urls in seconds or minutes
              depending on if the website is being tested locally or external.
            </p>
          </div>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { ApiInfo },
  {
    title: `${companyName}: Web Accessibility API`,
    description: `The web accessibility API for testing in real time. Determine accurate image alts and other inclusive recommendations with OpenAPI, graphQL, or gRPC.`,
    gql: true,
  }
)
