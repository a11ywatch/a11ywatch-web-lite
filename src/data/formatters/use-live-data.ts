import { Analytic, Issue, IssueMeta, PageLoadTimeMeta } from '@app/types'
import { useMemo } from 'react'

type LiveItem = Analytic & {
  pageInsights?: boolean
  pageLoadTime: PageLoadTimeMeta
}

// format live data for a website
export const useWebsiteLiveData = ({
  issues,
  issuesInfo,
}: {
  issues?: Issue | Issue[]
  issuesInfo?: IssueMeta | undefined
}) => {
  const { errorCount, warningCount, totalIssues, issuesFixedByCdn, liveData } =
    useMemo(() => {
      let errors = 0
      let warnings = 0
      let notices = 0
      let liveData: LiveItem[] = []

      const issueArray = issues && Array.isArray(issues) && issues.length

      // todo: use data from issues Info
      if (issueArray) {
        issues.forEach((iss: any) => {
          const pageInfo = iss?.issuesInfo
          const pageIssues = iss?.issues

          let currentErrors = 0
          let currentWarnings = 0
          let currentNotices = 0

          // direct object handling
          if (pageInfo) {
            currentErrors = pageInfo.errorCount
            currentWarnings = pageInfo.warningCount
            currentNotices = pageInfo.noticeCount
            errors += currentErrors
            warnings += currentWarnings
            notices += currentNotices
          } else {
            pageIssues?.forEach((page: Issue) => {
              if (page?.type === 'error') {
                currentErrors++
              }
              if (page?.type === 'warning') {
                currentWarnings++
              }
              if (page?.type === 'notice') {
                currentNotices++
              }
              errors += currentErrors
              warnings += currentWarnings
              notices += currentNotices
            })
          }

          liveData.push({
            pageUrl: iss.pageUrl,
            pageInsights: !!iss.pageInsights,
            pageLoadTime: iss.pageLoadTime,
            errorCount: currentErrors,
            warningCount: currentWarnings,
            noticeCount: currentNotices,
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
        liveData,
      }
    }, [issues, issuesInfo])

  return { errorCount, warningCount, totalIssues, issuesFixedByCdn, liveData }
}
