import { useCallback, useMemo } from 'react'
import { Link } from '../link'
import { RenderAvatar, RenderSecondary } from './render'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import type { Website } from '@app/types'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { HomeManager } from '@app/managers'

interface WebsiteCellProps extends Partial<Website> {
  removePress(props: { variables: { url?: string | null } }): void
  handleClickOpen(a: any, b: any, c?: string): void
  handleClickOpenPlayer: (a: boolean, b: any, c?: string) => () => void
  mutatationLoading: boolean
}

// OLD WEBSITE CELL [TODO: remove]
export function WebsiteCell(props: WebsiteCellProps) {
  const { selectedWebsite, setSelectedWebsite } = useInteractiveContext()
  const { removePress, ...extra } = props

  const {
    url,
    handleClickOpen,
    issues,
    issuesInfo,
    pageLoadTime,
    mutatationLoading,
    lastScanDate,
    pageHeaders,
  } = extra

  const { accessScore } = issuesInfo ?? {}

  const onRemovePress = useCallback(async () => {
    await removePress({
      variables: {
        url,
      },
    })
    if (url === selectedWebsite) {
      HomeManager.setDashboardView('')
      setSelectedWebsite('')
    }
  }, [url, removePress, selectedWebsite, setSelectedWebsite])

  const href = useMemo(
    () => (url ? `/website-details?url=${encodeURIComponent(url)}` : ''),
    [url]
  )

  const handleMainClick =
    (eventData?: any, title?: string, _mini?: boolean, url?: string) => () => {
      handleClickOpen(eventData, title, url)
    }

  return (
    <li
      className={'border-b space-y-1 flex w-full px-3 py-2 hover:no-underline'}
    >
      <RenderAvatar accessScore={accessScore} error={false} />
      <div className='space-y-2 flex flex-1 flex-col'>
        <Link href={href} className='text-lg'>
          {url}
        </Link>
        <RenderSecondary
          issuesInfo={issuesInfo}
          accessScore={accessScore}
          issues={issues}
          pageLoadTime={pageLoadTime}
          mutatationLoading={mutatationLoading}
          lastScanDate={lastScanDate}
          pageHeaders={pageHeaders}
        />
      </div>
      <div className='py-2'>
        <MoreOptions
          handleMainClick={handleMainClick}
          removePress={onRemovePress}
          {...extra}
        />
      </div>
    </li>
  )
}
