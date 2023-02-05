import { Button } from '@app/components/general/buttons'
import { Link } from '@app/components/general/link'
import { usePageSpeed } from '@app/data/external/pagespeed/results'
import { classNames } from '@app/utils/classes'
import Head from 'next/head'
import { memo, useMemo } from 'react'
import { GrView } from 'react-icons/gr'

type CellHeaderProps = {
  url?: string
  totalIssues?: number
  warningCount?: number
  errorCount?: number
  domain: string
  online?: boolean
  pageInsights?: boolean
  duration?: number
  handleMainClick?(data: any, name: string, _mini: boolean, url: string): any
  totalTTL: number
}

const ListCellPagesHeaderW = ({
  url = '',
  online,
  pageInsights,
  duration,
  handleMainClick,
  totalTTL,
}: CellHeaderProps) => {
  const { getPageSpeed } = usePageSpeed(url, (eventData) => {
    if (handleMainClick) {
      // curry function
      handleMainClick(eventData, 'Lighthouse', false, url)()
    }
  })

  const [u, link] = useMemo(() => {
    if (typeof window !== 'undefined' && url) {
      try {
        return [
          url.startsWith('https://')
            ? url.replace('https://', '')
            : url.replace('http://', ''),
          `/website-details?url=${encodeURI(url)}`,
        ]
      } catch (e) {
        console.error(e)
      }
    }
    return ['', '']
  }, [url])

  const ttlPercentage = (
    Math.ceil((((duration || 1) / (totalTTL || 1)) * 100) / 5) * 5
  ).toFixed(0)

  const dynamicTTLPercentage = `w-${ttlPercentage}-after`

  // return a small single row of the page and issues with a dropdown
  return (
    <>
      <Head>
        <style key={dynamicTTLPercentage}>
          {`.${dynamicTTLPercentage}::after {
          width: calc(${ttlPercentage}% + 2.6rem);
        }`}
        </style>
      </Head>
      <li
        className={classNames(
          'flex place-items-center text-xs md:text-sm row-bg relative hover:after:bg-transparent',
          dynamicTTLPercentage
        )}
      >
        <Link
          className={`px-4 py-2 text-left place-items-center flex-1 max-w-2/3 md:w-auto line-clamp-1 truncate text-xs md:text-sm hover:text-blue-800`}
          href={link}
        >
          {u}
        </Link>
        <div className='grid grid-cols-3 auto-cols-max text-center place-items-center text-right'>
          <div className='w-[2.4rem] md:w-[3rem]'>
            {pageInsights ? (
              <Button iconButton onClick={getPageSpeed}>
                <>
                  <span className='sr-only'>View Lighthouse</span>
                  <GrView className='grIcon text-xs' />
                </>
              </Button>
            ) : (
              'false'
            )}
          </div>
          <div className='w-[2.7rem] md:w-[3.8rem]'>
            {!!online || typeof online === 'undefined' ? 'true' : 'false'}
          </div>
          <div className='w-[3.6rem] md:w-[4.2rem] truncate'>
            {duration ? `${duration}ms` : 'N/A'}
          </div>
        </div>
      </li>
    </>
  )
}

export const ListCellPagesHeader = memo(ListCellPagesHeaderW)
