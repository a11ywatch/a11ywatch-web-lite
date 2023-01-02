import { memo, useMemo } from 'react'

type CellHeaderProps = {
  url?: string
  setVisible(x: any): void
  visible?: boolean
  totalIssues?: number
  warningCount?: number
  errorCount?: number
  domain: string
}

const ListCellAnalyticsHeaderW = ({
  url = '',
  setVisible,
  visible,
  warningCount,
  errorCount,
}: CellHeaderProps) => {
  const onTogglelist = () => setVisible((v: boolean) => !v)

  const pathName = useMemo(() => {
    let value = url

    try {
      value = new URL(url).pathname
    } catch (e) {
      console.error(e)
    }

    return value
  }, [url])

  // return a small single row of the page and issues with a dropdown
  return (
    <div className='flex place-items-center text-xs md:text-sm'>
      <button
        className={`px-4 py-3 text-left place-items-center hover:opacity-80 flex-1 max-w-2/3 md:w-auto`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${url}`}
      >
        {pathName}
      </button>
      <div className='grid grid grid-cols-2 gap-4 auto-cols-max pr-4'>
        <div className='text-right'>{warningCount}</div>
        <div className='text-right w-14'>{errorCount}</div>
      </div>
    </div>
  )
}

export const ListCellAnalyticsHeader = memo(ListCellAnalyticsHeaderW)