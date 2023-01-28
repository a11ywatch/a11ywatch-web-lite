import { Button } from '@app/components/general/buttons'
import { Link } from '@app/components/general/link'
import { usePageSpeed } from '@app/data/external/pagespeed/results'
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
}

const ListCellPagesHeaderW = ({
  url = '',
  online,
  pageInsights,
  duration,
  handleMainClick,
}: CellHeaderProps) => {
  const { getPageSpeed } = usePageSpeed(url, (eventData) => {
    if (handleMainClick) {
      // curry function
      handleMainClick(eventData, 'Lighthouse', false, url)()
    }
  })

  const [pathName, link] = useMemo(() => {
    if (typeof window !== 'undefined' && url) {
      try {
        const u = new URL(url)
        const p = `${u.pathname}${u.search}`

        return [p, `/website-details?url=${encodeURI(url)}`]
      } catch (e) {
        console.error(e)
      }
    }
    return ['', '']
  }, [url])

  // return a small single row of the page and issues with a dropdown
  return (
    <li className='flex place-items-center text-xs md:text-sm'>
      <Link
        className={`px-4 py-3 text-left place-items-center flex-1 max-w-2/3 md:w-auto line-clamp-1 truncate text-xs md:text-sm hover:text-blue-800`}
        href={link}
      >
        {pathName}
      </Link>
      <div className='grid grid grid-cols-3 auto-cols-max text-center place-items-center text-right'>
        <div className='w-[2.4rem] md:w-[3rem]'>
          {pageInsights ? (
            <Button iconButton onClick={getPageSpeed}>
              <GrView className='grIcon' />
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
  )
}

export const ListCellPagesHeader = memo(ListCellPagesHeaderW)
