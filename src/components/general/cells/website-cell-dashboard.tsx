import React, { useMemo, useCallback, useDeferredValue } from 'react'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import { Link } from '../link'
import { WebsiteSecondary } from './render'
import { BASE_GQL_URL, STATUS_URL } from '@app/configs/app-config'
import { copyClipboard } from '@app/lib'

import {
  PagesBox,
  LoadTimeBox,
  HeadersBox,
  LighthouseBox,
  StandardBox,
  IssuesBox,
  WarningsBox,
  SitemapBox,
  MonitoringEnabledBox,
} from './blocks'
import { MobileBox } from './blocks/mobile'
import { Issue, Website } from '@app/types'
import { Timer } from '../timer'
import { UserAgentBox } from './blocks/user-agent'
import { ActionsBox } from './blocks/actions'
import { CdnFixBox } from './blocks/cdn-fix'
import { useWasmContext } from '@app/components/providers'
import { useAuthContext } from '@app/components/providers/auth'
import { GrChannel, GrStatusInfo, GrSync, GrValidate } from 'react-icons/gr'
import { fetcher } from '@app/utils/fetcher'
import { AppManager, HomeManager } from '@app/managers'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { IssueCard } from './card/issue-card'
import { AnalyticsCard } from './card/analytics-card'
import { LighthouseCard } from './card/lighthouse-card'
import { TLDBox } from './blocks/tld'
import { SubDomainsBox } from './blocks/subdomains'
import { RobotsBox } from './blocks/robots'
import { useWebsiteLiveData } from '@app/data/formatters/use-live-data'
import { RunnersBox } from './blocks/runner'
import { ProxyBox } from './blocks/proxy'
import { Score } from '../blocks/score'
import { PageCard } from './card/pages-card'

const styles = {
  title: 'text-xl md:text-3xl font-medium truncate',
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

interface InteractiveProps extends Partial<WebsiteCellProps> {
  linkUrl: string
  onWebsiteCrawl(x: any): Promise<any>
  statusBadgeUrl: string
}

const statusRowClass =
  'hover:opacity-70 p-2 rounded text-xs md:text-sm lg:text-lg'

const WebsiteInteractiveBlock = ({
  url,
  onWebsiteCrawl,
  linkUrl,
  statusBadgeUrl,
}: InteractiveProps) => {
  return (
    <div className='flex place-items-center px-2 space-x-3 py-2 border-t'>
      <button
        title={`sync and check ${url} for issues`}
        className={statusRowClass}
        onClick={onWebsiteCrawl}
      >
        <GrSync className='grIcon' />
      </button>
      <Link
        title={`view in sandbox ${url}`}
        href={linkUrl}
        className={statusRowClass}
      >
        <GrChannel className='grIcon' />
      </Link>
      <button
        title={`copy status badge ${url}`}
        className={statusRowClass}
        onClick={copyClipboard}
      >
        <span className='sr-only'>{statusBadgeUrl}</span>
        <GrStatusInfo className='grIcon' />
      </button>
    </div>
  )
}

// main dashboard cell with details and paginated views
export function WebsiteCellDashboard({
  url,
  removePress,
  handleClickOpen,
  pages,
  issues: currentIssues,
  issuesInfo,
  crawlWebsite,
  pageLoadTime,
  lastScanDate,
  pageHeaders,
  index,
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
  runners,
  proxy,
  sitemap,
  monitoringEnabled,
}: Website & WebsiteCellProps) {
  const { account } = useAuthContext() // TODO: move to provider top level
  const { feed } = useWasmContext()
  const items: Issue[] = useDeferredValue(
    feed?.get_data_item(domain, !!(tld || subdomains)) ?? []
  )
  const { setSelectedWebsite, selectedWebsite } = useInteractiveContext()
  const issues = items.length ? items : currentIssues

  // real time issue tracking todo: send subscription with issuesInfo [todo: build analytics feed usage]
  const { errorCount, warningCount, totalIssues, issuesFixedByCdn, liveData } =
    useWebsiteLiveData({ issues, issuesInfo })

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
    }

  const { statusBadgeUrl, linkUrl, domainHost } = useMemo(() => {
    // TODO: REMOVE ALL URL CLIENT APPENDING
    const encodedUrl = encodeURIComponent(url)
    const reportsLink = `${BASE_GQL_URL}/${encodedUrl}`
    const reportsPageLink = `/reports/${encodedUrl}`
    // hostname should always be valid - ignore try catching
    const hostname = url && new URL(url).hostname
    const badgeUrl = `${STATUS_URL}/${encodeURIComponent(domain)}`

    return {
      domainHost: hostname,
      encodedUrl,
      reportsLink,
      reportsPageLink,
      linkUrl: `/website-details?url=${encodedUrl}`,
      statusBadgeUrl: `[![A11yWatch](${`${badgeUrl}`})](${reportsLink})`,
    }
  }, [domain, url])

  const pagecount = issuesInfo?.pageCount || 0
  const issueTotal = issuesInfo?.totalIssues || 0

  const pageIssueCount =
    issues && Array.isArray(issues) && issues.length > pagecount
      ? issues.length
      : pagecount

  const { accessScoreAverage: accessScore } = issuesInfo ?? {}

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
  }, [url, crawlWebsite])

  const lhVisible = pageInsights && insight && lighthouseVisible

  return (
    <li>
      <div className={`${index ? 'border-t' : ''}`}>
        <div className='border-b'>
          <div className='flex gap-x-1 place-items-center place-content-between pr-3'>
            <div className='flex gap-2 md:gap-4 place-items-center flex-wrap py-2 px-2'>
              <div className='border-r border-dashed text-center pl-2 pr-4'>
                <Score score={accessScore} />
              </div>
              <div className={`flex place-items-center truncate flex-wrap`}>
                <div className='pr-4'>
                  <Link
                    href={url}
                    target='_blank'
                    className={`${styles.title} hover:text-blue-700 p-0`}
                  >
                    {domainHost}
                  </Link>
                  <WebsiteSecondary
                    domain={domain}
                    issuesInfo={{
                      ...issuesInfo,
                      totalIssues:
                        totalIssues > issueTotal ? totalIssues : issueTotal,
                    }}
                    pageIssueCount={pageIssueCount}
                    pageLoadTime={pageLoadTime}
                    lastScanDate={lastScanDate}
                    score={accessScore}
                    pageHeaders={pageHeaders}
                    robots={robots}
                    subdomains={subdomains}
                    tld={tld}
                    dashboard
                    online={online}
                    borderLess
                  />
                </div>
                {verified ? (
                  <GrValidate
                    className='grIcon text-sm'
                    title={`${url} is verified.`}
                  />
                ) : null}
              </div>
              <Timer
                stop={!activeCrawl}
                duration={crawlDuration}
                shutdown={shutdown}
              />
            </div>
            <MoreOptions
              url={url}
              crawlWebsite={onWebsiteCrawl}
              handleMainClick={handleMainClick}
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
          <WebsiteInteractiveBlock
            url={url}
            linkUrl={linkUrl}
            onWebsiteCrawl={onWebsiteCrawl}
            activeCrawl={activeCrawl}
            crawlDuration={crawlDuration}
            statusBadgeUrl={statusBadgeUrl}
          />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1'>
          <IssuesBox issues={errorCount} />
          <WarningsBox issues={warningCount} />
          <CdnFixBox issues={issuesFixedByCdn} />
          <PagesBox count={pageIssueCount ?? 'N/A'} />
          <LoadTimeBox duration={pageLoadTime?.duration} />
          <HeadersBox pageHeaders={pageHeaders} />
          <LighthouseBox pageInsights={pageInsights} />
          <ActionsBox actions={actionsEnabled && actions?.length} />
          <RunnersBox url={url} runners={runners} />
          <ProxyBox
            proxy={proxy}
            url={url}
            activeSubscription={account.activeSubscription}
          />
          <UserAgentBox ua={ua} url={url} />
          <StandardBox standard={standard} url={url} />
          <MonitoringEnabledBox enabled={monitoringEnabled} url={url} />
          <RobotsBox robots={robots} url={url} />
          <MobileBox mobile={mobile} url={url} />
          <SubDomainsBox
            subdomains={subdomains}
            url={url}
            activeSubscription={account.activeSubscription}
          />
          <TLDBox
            tld={tld}
            url={url}
            activeSubscription={account.activeSubscription}
          />
          <SitemapBox
            sitemap={sitemap}
            url={url}
            activeSubscription={account.activeSubscription}
          />
        </div>
        {account.activeSubscription && (issuesInfo || liveData.length) ? (
          <AnalyticsCard domain={domain} liveData={liveData} />
        ) : null}
        <div className='py-3'>
          {issuesInfo || liveData.length ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 px-2'>
              <div className='border rounded-sm overflow-hidden'>
                <IssueCard pageUrl={url} liveData={liveData} />
              </div>
              <div className='border rounded-sm overflow-hidden'>
                <PageCard
                  pageUrl={url}
                  liveData={liveData}
                  handleMainClick={handleMainClick}
                />
              </div>
            </div>
          ) : null}
        </div>
        {lhVisible ? (
          <div className='py-3'>
            <LighthouseCard lighthouseVisible={lhVisible} insight={insight} />
          </div>
        ) : null}
      </div>
    </li>
  )
}
