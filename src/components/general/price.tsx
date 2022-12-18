'use client'

import { useState } from 'react'
import { priceConfig } from '@app/configs'

import { Link } from '@app/components/stateless/typo/link'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { PriceCell } from './cells/price-cell'
import { PriceFeat } from './cells/price-feat'
import { Header3 } from './header'
import { Button } from './buttons'
import { trialDuration } from '@app/configs/app-config'

const getStyles = (inactive: boolean) =>
  inactive ? 'text-gray-700 border-gray-700' : 'text-blue-700 border-blue-700'

const getPrimaryColor = (title: string) => {
  let color = '#0E1116'
  if (title === 'Premium') {
    color = '#8956ef'
  } else if (title === 'Free') {
    color = '#00875b'
  } else if (title === 'Basic') {
    color = '#2b72e6'
  }
  return color
}

function MainButton({
  title,
  navigate,
  yearly,
}: {
  title: string
  yearly: boolean
  navigate: boolean
}) {
  if (navigate) {
    // mono font-family to prevent shift in chars on dynamic changes
    return (
      <div className='pb-2 justify-center flex'>
        <Link
          className={`w-[15rem] tracking-wide text-lg text-gray-50 bg-blue-700 border-4 border-blue-600 px-4 py-2 hover:ring hover:no-underline rounded-3xl text-center`}
          href={`/register?plan=${title}${yearly ? '&yearly=true' : ''}`}
        >
          {`${title} - ${trialDuration} Day Trial Start`}
        </Link>
      </div>
    )
  }

  return null
}

export function PriceMemo({
  onClick,
  navigate,
  yearly: year,
  setYearly: setYear,
  pricingPage,
  initialIndex = 0,
  highPlan = false,
  currentPlan,
}: any) {
  const [yearly, onSetYear] = useState<boolean>(!!year)
  const [selectedPlan, onSelectPlan] = useState<number>(initialIndex || 0)
  const [selectHighPlans, onSelectHigh] = useState<boolean>(highPlan)

  const setYearly = (params: any) => {
    if (typeof setYear === 'function') {
      setYear(params)
    }
    // inner state
    onSetYear(params)
  }

  const onSetYearlyEvent = () => {
    setYearly((x: boolean) => !x)
  }

  const onPlanClick = (title: string, index: number) => {
    if (typeof onClick === 'function') {
      onClick(title)
    }
    onSelectPlan(index)
  }

  const onTogglePlans = () => {
    onSelectHigh((x: boolean) => !x)
    if (typeof onClick === 'function') {
      const p = !selectHighPlans ? priceConfig.hPlans : priceConfig.lPlans
      const s = selectedPlan >= 0 && p[selectedPlan].title

      s && onClick(s)
    }
  }

  const plans = selectHighPlans ? priceConfig.hPlans : priceConfig.lPlans
  const selected = selectedPlan >= 0 && plans[selectedPlan].title

  return (
    <>
      {typeof onClick === 'undefined' && !pricingPage ? (
        <>
          <Header3 style={onClick ? { fontWeight: 200 } : {}}>
            {navigate ? 'Plans for everyone' : 'Pricing'}
          </Header3>
          <p className='pb-2 text-xl'>
            Flexible plans that can be adjusted at any time.
          </p>
        </>
      ) : null}

      <div className='flex space-x-1 place-items-center py-4'>
        <Button
          type='button'
          onClick={onSetYearlyEvent}
          className={`border relative px-2 rounded-3xl py-2 text-sm whitespace-nowrap sm:w-72 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:z-10 sm:px-8 ${getStyles(
            yearly
          )}`}
        >
          {yearly
            ? 'Switch back to monthly pricing plans'
            : 'Get 2 months free (switch to yearly)'}
        </Button>
      </div>

      <div className='flex flex-1 gap-3 flex-wrap-reverse md:flex-wrap'>
        <ul
          id='plans-section'
          className={`w-full md:w-auto grid nowrap md:flex-wrap xl:grid-cols-2 gap-2 list-none`}
        >
          {plans.map((planProps: any, index: number) => {
            const title = planProps.title
            const onPriceClick = () => onPlanClick(title, index)
            const textColor = getPrimaryColor(title)

            const selectedItem = index === selectedPlan
            const activePlan = currentPlan === title

            return (
              <li className='w-full' key={title}>
                <PriceCell
                  textColor={textColor}
                  onClick={onPriceClick}
                  yearly={yearly}
                  selected={selectedItem}
                  selectHighPlans={selectHighPlans}
                  pricingPage={pricingPage}
                  activePlan={activePlan}
                  {...planProps}
                />
              </li>
            )
          })}
          <li className='w-full'>
            <div className='min-w-[330px] w-full h-full rounded flex flex-1 flex-col justify-between border-2 px-4 py-2 border-black text-gray-700'>
              <div className='text-base font-medium'>
                All pricing is in USD.
              </div>
              <div className='text-sm pb-3.5'>
                Renews are auto until cancelled.
              </div>

              <button
                onClick={onTogglePlans}
                className={
                  'px-3 py-1 border-2 text-gray-700 rounded text-base border-gray-700 hover:border-gray-600 hover:bg-gradient-radial hover:text-black'
                }
              >
                {selectHighPlans
                  ? 'View normal plans'
                  : 'View high traffic plans'}
              </button>
            </div>
          </li>
        </ul>
        <PriceFeat
          yearly={yearly}
          title={'All plans include:'}
          details={priceConfig.feats}
        >
          {navigate && selected ? (
            <div className='px-4 w-full'>
              <MainButton
                title={selected}
                navigate={navigate}
                yearly={yearly}
              />
            </div>
          ) : null}
        </PriceFeat>
      </div>

      <div className='text-center py-4 text-sm'>
        Need more? We can easily handle thousands of scans per minute,{' '}
        <a href='mailto:support@a11ywatch.com' className='underline'>
          get in touch
        </a>{' '}
        for a quote.
      </div>
    </>
  )
}

export const Price = (props: any) => {
  return (
    <SectionContainer>
      <PriceMemo {...props} />
    </SectionContainer>
  )
}
