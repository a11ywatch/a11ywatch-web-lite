import { memo, useEffect, useMemo, useState } from 'react'
import {
  GrCalendar,
  GrCircleAlert,
  GrConfigure,
  GrMagic,
  GrPowerShutdown,
} from 'react-icons/gr'
import { format } from 'date-fns'
import { Chip } from '@app/components/general/chip'
import { Website } from '@app/types'

// TODO: REFACTOR WITH Secondary (BASE)
export function WebsiteSecondaryComponent({
  pageIssueCount = 0, // TODO: remove for issues info
  lastScanDate,
  issuesInfo,
  pageHeaders,
  shutdown,
  online,
}: Website & {
  pageIssueCount?: number
  adaScore?: number | string
  dashboard?: boolean
  online?: boolean
}) {
  const [lastScan, setScanDate] = useState<string>('')
  const {
    possibleIssuesFixedByCdn,
    issuesFixedByCdn,
    totalIssues = 0,
  } = issuesInfo ?? {}

  const { headers, headingJson } = useMemo(() => {
    const heads =
      pageHeaders && pageHeaders.length
        ? pageHeaders
            .filter((item: any) => item.key)
            .map((item: any) => ({ [item.key]: item?.value }))
        : []

    return { headers: heads, headingJson: heads && JSON.stringify(heads) }
  }, [pageHeaders])

  useEffect(() => {
    // format client side date - mismatch hydrated data
    if (!lastScan && lastScanDate) {
      setScanDate(format(new Date(lastScanDate), 'dd/MM/yyyy'))
    }
  }, [lastScan, lastScanDate, setScanDate])

  return (
    <div className={`flex gap-x-1 overflow-x-auto max-w-[75vw]`}>
      {shutdown ? (
        <Chip
          title={`Website scan did not complete. Upgrade your account to increase your scanning up-time.`}
          avatar={<GrPowerShutdown className={'grIcon'} />}
          label={'Shutdown'}
        />
      ) : null}
      {pageIssueCount && totalIssues ? (
        <Chip
          avatar={<GrCircleAlert className={'grIcon'} />}
          label={totalIssues}
          title={`Total page issues between warnings and errors: ${totalIssues}`}
        />
      ) : null}
      {typeof online !== 'undefined' && !online ? (
        <Chip
          avatar={<GrPowerShutdown className={'grIcon'} />}
          label={'Offline'}
          title={`The page is offline`}
        />
      ) : null}
      {possibleIssuesFixedByCdn && totalIssues ? (
        <Chip
          avatar={<GrMagic />}
          label={
            issuesFixedByCdn
              ? `${issuesFixedByCdn}/${totalIssues}`
              : `${possibleIssuesFixedByCdn}/${totalIssues}`
          }
          title={
            issuesFixedByCdn
              ? `${issuesFixedByCdn} issue${
                  issuesFixedByCdn === 1 ? '' : ''
                } fixed from CDN out of ${totalIssues} for current page.`
              : `${possibleIssuesFixedByCdn} out of ${totalIssues} issues on the current page can be fixed instantly with our custom CDN.`
          }
        />
      ) : null}
      {lastScan ? (
        <Chip avatar={<GrCalendar className={'grIcon'} />} label={lastScan} />
      ) : null}
      {headers && headers.length ? (
        <Chip
          avatar={<GrConfigure className={'grIcon'} />}
          label={`${headers.length} custom header${
            headers.length === 1 ? '' : 's'
          }`}
          title={`Custom headers ${headingJson}`}
        />
      ) : null}
    </div>
  )
}

export const WebsiteSecondary = memo(WebsiteSecondaryComponent)
