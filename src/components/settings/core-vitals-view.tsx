import React, { useState } from 'react'
import { Header3 } from '@app/components/general/header'
import { User } from '@app/types'
import { settingsHeadingStyle } from '@app/styles/headings'

export const CoreVitalsView = ({
  onConfirmLighthouse,
  user,
}: {
  onConfirmLighthouse(key: string): Promise<void>
  user: User
}) => {
  const [pageSpeedKey, setPageSpeed] = useState<string>('')
  const onSetLighthouseCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageSpeed(e.currentTarget.value)
  }

  const onSubmitLighthouse = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e?.preventDefault()

    try {
      await onConfirmLighthouse(pageSpeedKey)
    } catch (e) {
      console.error(e)
    }
  }

  const userPageSpeedKey = user?.pageSpeedApiKey ?? ''

  return (
    <div className='py-2 gap-y-2 border-t'>
      <div>
        <Header3 className={settingsHeadingStyle}>Core Web Vitals</Header3>
        <p>
          Core Web Vitals are a set of speed metrics that are part of{' '}
          {`Google’s`} Page Experience signals used to measure user experience.
          We retrieve them using PageSpeed Insights API along with our own
          internal usage. In order to speed of your workflows you can add your
          own key. {`It’s`} free but limited to a daily quota.
        </p>
        <div className='py-2'>
          <a
            href={'https://developers.google.com/speed'}
            target={'_blank'}
            rel={'noreferrer'}
            className={'text-blue-600'}
          >
            Learn more
          </a>
        </div>
      </div>
      <div>
        <ul className='space-y-2 py-3 list-decimal px-4'>
          <li>
            <a
              target={'_blank'}
              rel={'noreferrer'}
              className={'text-blue-600 p-1'}
              href={
                'https://developers.google.com/speed/docs/insights/v5/get-started'
              }
            >
              Get a free PageSpeed API key from Google
            </a>
          </li>
          <li className='p-1'>Enter the received code</li>
        </ul>
        <form onSubmit={onSubmitLighthouse}>
          <div>
            <label htmlFor='pagespeed-code' className='sr-only'>
              PageSpeed Code
            </label>
            <input
              id={'pagespeed-code'}
              onChange={onSetLighthouseCode}
              placeholder='Enter the code'
              className='p-3 border rounded rounded-r-none'
              value={pageSpeedKey || userPageSpeedKey}
            ></input>
            <button
              type={'submit'}
              disabled={!pageSpeedKey}
              className={'border p-3 rounded rounded-l-none border-l-0'}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
