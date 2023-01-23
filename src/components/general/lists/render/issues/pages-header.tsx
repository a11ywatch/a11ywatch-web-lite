import { Button } from '@app/components/general/buttons'
import { usePageSpeed } from '@app/data/external/pagespeed/results'
import { memo, useMemo } from 'react'
import { GrView } from 'react-icons/gr'

type CellHeaderProps = {
  url?: string
  setVisible(x: any): void
  visible?: boolean
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
  setVisible,
  visible,
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

  const onTogglelist = () => setVisible((v: boolean) => !v)

  const pathName = useMemo(() => {
    if (typeof window !== 'undefined' && url) {
      try {
        const u = new URL(url)
        return `${u.pathname}${u.search}`
      } catch (e) {
        console.error(e)
      }
    }
  }, [url])

  // return a small single row of the page and issues with a dropdown
  return (
    <div className='flex place-items-center text-xs md:text-sm'>
      <button
        className={`px-4 py-3 text-left place-items-center hover:opacity-80 flex-1 max-w-2/3 md:w-auto line-clamp-1 truncate`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${url}`}
      >
        {pathName}
      </button>
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
    </div>
  )
}

export const ListCellPagesHeader = memo(ListCellPagesHeaderW)
