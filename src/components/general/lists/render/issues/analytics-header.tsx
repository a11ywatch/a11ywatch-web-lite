import { classNames } from '@app/utils/classes'
import Head from 'next/head'
import { memo } from 'react'

type CellHeaderProps = {
  url?: string
  setVisible(x: any): void
  visible?: boolean
  totalIssues?: number
  warningCount?: number
  errorCount?: number
  domain: string
  totalErrors: number
}

const ListCellAnalyticsHeaderW = ({
  url = '',
  setVisible,
  visible,
  warningCount,
  errorCount,
  totalErrors,
}: CellHeaderProps) => {
  const onTogglelist = () => setVisible((v: boolean) => !v)

  const errorPercentage = (
    Math.ceil((((errorCount || 1) / (totalErrors || 1)) * 100) / 5) * 5
  ).toFixed(0)

  const dynamicErrorClassName = `w-${errorPercentage}-after`
  const disabled = !warningCount && !errorCount

  // return a small single row of the page and issues with a dropdown
  return (
    <>
      {totalErrors ? (
        <Head>
          <style key={dynamicErrorClassName}>
            {`.${dynamicErrorClassName}::after {
          width: calc(${errorPercentage}% + 2.6rem);
        }`}
          </style>
        </Head>
      ) : null}
      <div
        className={classNames(
          'flex place-items-center text-xs md:text-sm row-bg relative hover:after:bg-transparent',
          dynamicErrorClassName
        )}
      >
        <button
          className={`px-4 py-2 text-left place-items-center${
            !disabled ? ' hover:opacity-80' : ''
          } flex-1 max-w-2/3 md:w-auto line-clamp-1 truncate`}
          onClick={onTogglelist}
          aria-expanded={visible}
          disabled={disabled}
          aria-label={`Toggle section visible for ${url}`}
        >
          {url.startsWith('https://')
            ? url.replace('https://', '')
            : url.replace('http://', '')}
        </button>
        <div className='grid grid-cols-2 gap-4 auto-cols-max pr-4'>
          <div className='text-right'>{warningCount}</div>
          <div className='text-right w-14'>{errorCount}</div>
        </div>
      </div>
    </>
  )
}

export const ListCellAnalyticsHeader = memo(ListCellAnalyticsHeaderW)
