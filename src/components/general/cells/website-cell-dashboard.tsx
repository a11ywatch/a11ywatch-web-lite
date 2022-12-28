import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  useDeferredValue,
} from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import { BASE_GQL_URL, STATUS_URL } from '@app/configs/app-config'

import {
  AccessibilityBox,
  PagesBox,
  LoadTimeBox,
  HeadersBox,
  LighthouseBox,
  OnlineBox,
  StatusBadgeBox,
  CustomCDNBox,
  StandardBox,
  IssuesBox,
  WarningsBox,
} from './blocks'
import { MobileBox } from './blocks/mobile'
import { Issue, Website } from '@app/types'
import { Timer } from '../timer'
import { UserAgentBox } from './blocks/user-agent'
import { ActionsBox } from './blocks/actions'
import { CdnFixBox } from './blocks/cdn-fix'
import { useWasmContext } from '@app/components/providers'
import { useAuthContext } from '@app/components/providers/auth'
import {
  GrChannel,
  GrStatusWarningSmall,
  GrSync,
  GrValidate,
} from 'react-icons/gr'
import { fetcher } from '@app/utils/fetcher'
import { AppManager, HomeManager } from '@app/managers'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { IssueCard } from './card/issue-card'
import { AnalyticsCard } from './card/analytics-card'
import { LighthouseCard } from './card/lighthouse-card'
import { TLDBox } from './blocks/tld'
import { SubDomainsBox } from './blocks/subdomains'
import { RobotsBox } from './blocks/robots'

const styles = {
  title:
    'text-xl md:text-3xl font-bold truncate text-gray-600 dark:text-gray-100',
  spacing: 'py-2',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

interface WebsiteCellProps {
  index: number
  crawlWebsite(x: any): Promise<any>
  removePress(x: any): Promise<any>
  crawlDuration?: number
  lighthouseVisible?: boolean
  activeCrawl?: Record<string, unknown>
  handleClickOpen(data: any, title: any, url: any, error: any): void
  url: string
  pageHeaders?: any
}

// main dashboard cell with details and paginated views
export function WebsiteCellDashboardComponent({
  url,
  removePress,
  handleClickOpen,
  pages,
  issues: currentIssues,
  issuesInfo,
  cdnConnected,
  crawlWebsite,
  pageLoadTime,
  lastScanDate,
  pageHeaders,
  index,
  script,
  domain,
  online,
  insight,
  pageInsights,
  mobile,
  lighthouseVisible,
  standard,
  activeCrawl,
  crawlDuration,
  ua,
  actions,
  actionsEnabled,
  robots,
  subdomains,
  tld,
  shutdown,
  verified,
}: Website & WebsiteCellProps) {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { account } = useAuthContext() // TODO: move to provider top level
  const { feed } = useWasmContext()
  const items = useDeferredValue(
    feed?.get_data_item(domain, !!(tld || subdomains)) ?? []
  )
  const { setSelectedWebsite, selectedWebsite } = useInteractiveContext()

  const issues = items?.length ? items : currentIssues
  const { activeSubscription } = account

  const handleMenu = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      setAnchorEl(event?.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const onRemovePress = useCallback(async () => {
    if (url === selectedWebsite) {
      HomeManager.setDashboardView('')
      setSelectedWebsite('')
    }
    try {
      await removePress({
        variables: {
          url,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [url, removePress, selectedWebsite, setSelectedWebsite])

  const handleMainClick =
    (eventData?: any, title?: string, _mini?: boolean, url?: string) =>
    async () => {
      // mini player open - small modal with dynamic content
      let eventDS = eventData

      // todo: open modal and set loading afterwards
      if (title === 'Verify DNS' && url) {
        eventDS = await fetcher(
          '/website/dns',
          { domain: new URL(url).hostname },
          'POST'
        )
      }
      if (title === 'Website Analytics') {
        const path = url
          ? `/list/analytics?limit=10000&domain=${new URL(url).hostname}`
          : '/list/website?=limit=50'
        eventDS = await fetcher(path, null, 'GET')
      }

      if (handleClickOpen) {
        handleClickOpen(eventDS, title, url, null)
      }

      setAnchorEl(null)
    }

  // real time issue tracking todo: send subscription with issuesInfo
  const { errorCount, warningCount, totalIssues, issuesFixedByCdn } =
    useMemo(() => {
      let errors = 0
      let warnings = 0
      let notices = 0

      if (issues?.length) {
        issues.forEach((iss: any) => {
          const pageIssues = iss?.issues
          pageIssues?.forEach((page: Issue) => {
            if (page?.type === 'error') {
              errors++
            }
            if (page?.type === 'warning') {
              warnings++
            }
            if (page?.type === 'notice') {
              notices++
            }
          })
        })
      } else if (issuesInfo) {
        errors = issuesInfo.errorCount || 0
        warnings = issuesInfo.warningCount || 0
        notices = issuesInfo.noticeCount || 0
      }

      return {
        issuesFixedByCdn: issuesInfo?.issuesFixedByCdn,
        errorCount: errors,
        warningCount: warnings,
        noticeCount: notices,
        totalIssues: errors + warnings + notices,
      }
    }, [issues, issuesInfo])

  const {
    statusBadgeUrl,
    reportsLink,
    reportsPageLink,
    linkUrl,
    linkView,
    domainHost,
  } = useMemo(() => {
    // TODO: REMOVE ALL URL CLIENT APPENDING
    const encodedUrl = encodeURIComponent(url)
    const statusBadgeUrl = `${STATUS_URL}/${encodeURIComponent(domain)}`

    const reportsLink = `${BASE_GQL_URL}/${encodedUrl}`
    const reportsPageLink = `/reports/${encodedUrl}`
    // hostname should always be valid - ignore try catching
    const hostname = url && new URL(url).hostname

    return {
      domainHost: hostname,
      statusBadgeUrl,
      encodedUrl,
      reportsLink,
      reportsPageLink,
      linkUrl: `/website-details?url=${encodedUrl}`,
      linkView: `/web-view?url=${encodedUrl}`,
    }
  }, [domain, url])

  const pagecount = issuesInfo?.pageCount || 0
  const issueTotal = issuesInfo?.totalIssues || 0

  const pageIssueCount = issues?.length > pagecount ? issues.length : pagecount

  const { adaScoreAverage: adaScore } = issuesInfo ?? {}

  const onWebsiteCrawl = useCallback(async () => {
    AppManager.toggleSnack(
      true,
      `Scan in progress, you’ll be notified if new issues occur.`,
      'message'
    )
    try {
      await crawlWebsite({
        variables: {
          url,
        },
      })
    } catch (e) {}

    handleClose()
  }, [url, handleClose, crawlWebsite])

  return (
    <li>
      <div className={`${index ? 'border-t' : ''}`}>
        <div>
          <div className='flex gap-x-1 place-items-center place-content-between border-b px-3 pt-2 pb-4'>
            <div className='flex gap-3 place-items-center flex-wrap'>
              <div>
                <div
                  className={`${styles.title} flex space-x-2 place-items-center pb-2`}
                >
                  <Link
                    title={`view details ${url}`}
                    href={linkView}
                    className={`${styles.title} p-0`}
                  >
                    {domainHost}
                  </Link>
                  {shutdown ? (
                    <GrStatusWarningSmall
                      className={`grIcon text-xs `}
                      title={'Crawl did not complete.'}
                    />
                  ) : null}
                  {verified ? (
                    <GrValidate
                      className='grIcon text-sm'
                      title={`${url} is verified.`}
                    />
                  ) : null}
                </div>
                <WebsiteSecondary
                  domain={domain}
                  issuesInfo={{
                    ...issuesInfo,
                    totalIssues:
                      totalIssues > issueTotal ? totalIssues : issueTotal,
                  }}
                  pageIssueCount={pageIssueCount}
                  cdnConnected={cdnConnected}
                  adaScore={adaScore}
                  issues={issues}
                  pageLoadTime={pageLoadTime}
                  lastScanDate={lastScanDate}
                  pageHeaders={pageHeaders}
                  robots={robots}
                  subdomains={subdomains}
                  tld={tld}
                  shutdown={shutdown}
                  dashboard
                />
              </div>
              <div className='flex place-items-center px-2 space-x-3'>
                <button
                  title={`sync and check ${url} for issues`}
                  className={'hover:opacity-70 p-2 rounded'}
                  onClick={onWebsiteCrawl}
                >
                  <GrSync className='grIcon' />
                </button>
                <Link
                  title={`view in sandbox ${url}`}
                  href={linkUrl}
                  className={'hover:opacity-70 p-2 rounded'}
                >
                  <GrChannel className='grIcon' />
                </Link>
                <div className='pl-1 border-l'>
                  <div className='pl-3'>
                    <Timer stop={!activeCrawl} duration={crawlDuration} />
                  </div>
                </div>
              </div>
            </div>
            <MoreOptions
              url={url}
              issues={issues}
              crawlWebsite={onWebsiteCrawl}
              handleClose={handleClose}
              handleMenu={handleMenu}
              handleMainClick={handleMainClick}
              anchorEl={anchorEl}
              removePress={onRemovePress}
              pages={pages}
              pageHeaders={pageHeaders}
              index={index}
              subdomains={subdomains}
              tld={tld}
              pageInsights={pageInsights}
              shutdown={shutdown}
              verified={verified}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1'>
          <AccessibilityBox adaScore={adaScore} />
          <IssuesBox issues={errorCount} />
          <WarningsBox issues={warningCount} />
          <CdnFixBox issues={issuesFixedByCdn} />
          <PagesBox count={pageIssueCount ?? 'N/A'} />
          <LoadTimeBox duration={pageLoadTime?.duration} />
          <HeadersBox pageHeaders={pageHeaders} />
          <LighthouseBox pageInsights={pageInsights} />
          <ActionsBox actions={actionsEnabled && actions?.length} />
          <OnlineBox online={online} />
          <UserAgentBox ua={ua} url={url} />
          <StandardBox standard={standard} url={url} />

          <RobotsBox robots={robots} url={url} />
          <MobileBox mobile={mobile} url={url} />

          <TLDBox
            tld={tld}
            url={url}
            activeSubscription={account.activeSubscription}
          />
          <SubDomainsBox
            subdomains={subdomains}
            url={url}
            activeSubscription={account.activeSubscription}
          />

          <CustomCDNBox
            cdnConnected={cdnConnected}
            script={script}
            activeSubscription={activeSubscription}
            domain={domain}
          />
          <StatusBadgeBox
            reportsLink={reportsLink}
            statusBadgeUrl={statusBadgeUrl}
            domain={domain}
            reportsPageLink={reportsPageLink}
            hideBadge
          />
        </div>

        <AnalyticsCard
          activeSubscription={account.activeSubscription}
          domain={domain}
        />

        <LighthouseCard
          lighthouseVisible={pageInsights && insight && lighthouseVisible}
          insight={insight}
        />

        <IssueCard pageUrl={url} />
      </div>
    </li>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)
