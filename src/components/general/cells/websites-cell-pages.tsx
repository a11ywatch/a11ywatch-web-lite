import { useMemo, memo } from 'react'
import { Link } from '../link'

import {
  AccessibilityBox,
  LoadTimeBox,
  LighthouseBox,
  OnlineBox,
  IssuesBox,
  WarningsBox,
} from './blocks'
import { Issue } from '@app/types'
import { MoreOptionsBase } from './menu'
import { Lighthouse } from '../lighthouse'
import { usePageSpeed } from '@app/data/external/pagespeed/results'

const styles = {
  title: 'text-base md:text-lg truncate',
  spacing: 'py-1',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

// TODO: add types
export function WebsiteCellPagesComponent({
  url,
  handleClickOpen,
  pages,
  issues,
  issuesInfo,
  crawlWebsite,
  pageLoadTime,
  pageHeaders,
  index,
  online,
  insight,
  pageInsights,
  lighthouseVisible,
}: any) {
  const { accessScore } = issuesInfo ?? {}
  const { loading, getPageSpeed } = usePageSpeed(url, (eventData) => {
    handleClickOpen(eventData, 'Lighthouse', url)
  })

  const lhExists = insight && Object.keys(insight)?.length

  const handleMainClick =
    (eventData?: any, title?: string, _mini?: boolean, url?: string) => () => {
      if (!lhExists) {
        getPageSpeed()
      } else if (handleClickOpen) {
        handleClickOpen(eventData, title, url)
      }
    }

  const linkUrl = useMemo(
    () => `/website-details?url=${encodeURIComponent(url)}`,
    [url]
  )

  // real time issue tracking [TODO: combine with website analytic data]
  const { errorCount, warningCount } = useMemo(() => {
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
    } else {
      errors = issuesInfo?.errorCount
      warnings = issuesInfo?.warningCount
      notices = issuesInfo?.noticesCount
    }

    return {
      errorCount: errors,
      warningCount: warnings,
      noticeCount: notices,
      totalIssues: errors + warnings + notices,
    }
  }, [issues, issuesInfo])

  const lhQuerable = pageInsights || (insight && !!lhExists)

  return (
    <li className={'px-3 pt-2'}>
      <div className='flex space-x-2 place-items-center'>
        <div className={`${styles.title} flex-1`}>
          <Link
            title={`view in sandbox ${url}`}
            href={linkUrl}
            className={styles.title}
          >
            {url}
          </Link>
        </div>
        <div
          aria-hidden={!!loading}
          className={`text-xs opacity-90 ${loading ? 'block' : 'hidden'}`}
        >
          Loading Lighthouse...
        </div>
        <div>
          <MoreOptionsBase
            url={url}
            issues={issues}
            crawlWebsite={crawlWebsite}
            handleMainClick={handleMainClick}
            pages={pages}
            pageHeaders={pageHeaders}
            index={index}
            pageInsights={pageInsights}
            lh={lhExists ? insight : null}
          />
        </div>
      </div>
      <div className={styles.spacing} />
      <div className='grid grid-cols-1 gap-1 sm:grid-cols-3'>
        <AccessibilityBox accessScore={accessScore} average={false} />
        <IssuesBox issues={errorCount} />
        <WarningsBox issues={warningCount} />
        <LoadTimeBox duration={pageLoadTime?.duration} />
        <LighthouseBox pageInsights={lhQuerable} />
        <OnlineBox online={online} />
      </div>
      <div className={styles.spacing} />
      <div
        className={`py-2 ${
          pageInsights && lighthouseVisible ? 'visible' : 'hidden'
        }`}
        aria-expanded={insight && lighthouseVisible}
      >
        {insight ? <Lighthouse insight={insight} /> : null}
      </div>
    </li>
  )
}

export const WebsiteCellPages = memo(WebsiteCellPagesComponent)
