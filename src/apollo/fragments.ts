import gql from 'graphql-tag'

// exact page issue fragment
export const pageIssuesFragments = gql`
  fragment PageIssuesParts on PageIssue {
    code
    type
    selector
    message
    context
    recurrence
  }
`

export const issueFragments = gql`
  ${pageIssuesFragments}
  fragment IssueParts on Issue {
    _id
    pageUrl
    issues {
      ...PageIssuesParts
    }
  }
`

export const pagesFragments = gql`
  fragment PagesParts on Pages {
    _id
    domain
    url
    pageInsights
    online
    pageLoadTime {
      duration
      durationFormated
    }
    issuesInfo {
      accessScore
      possibleIssuesFixedByCdn
      totalIssues
      issuesFixedByCdn
      errorCount
      warningCount
      noticeCount
    }
  }
`

// todo: rename pagesSlim and use fragment
export const pagesSlimFragments = gql`
  fragment PagesSlimParts on Pages {
    _id
    domain
    url
    pageInsights
    online
    pageLoadTime {
      duration
      durationFormated
    }
  }
`

export const websiteFragments = gql`
  fragment WebsiteParts on Website {
    _id
    url
    domain
    lastScanDate
    online
    pageInsights
    mobile
    standard
    verified
    monitoringEnabled
    insight {
      json
    }
    issuesInfo {
      accessScore
      accessScoreAverage
      possibleIssuesFixedByCdn
      totalIssues
      issuesFixedByCdn
      errorCount
      warningCount
      noticeCount
      pageCount
    }
    pageHeaders {
      key
      value
    }
    pageLoadTime {
      duration
      durationFormated
    }
    crawlDuration
    ua
    actionsEnabled
    robots
    subdomains
    tld
    shutdown
    ignore
    rules
    runners
    proxy
    sitemap
  }
`

export const analyticsFragments = gql`
  fragment AnalyticParts on Analytic {
    _id
    domain
    pageUrl
    accessScore
    possibleIssuesFixedByCdn
    totalIssues
    issuesFixedByCdn
    errorCount
    warningCount
    noticeCount
  }
`

export const pagespeedFragment = gql`
  fragment PagespeedParts on PageInsights {
    _id
    domain
    pageUrl
    json
  }
`
