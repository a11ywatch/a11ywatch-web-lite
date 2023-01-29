import gql from 'graphql-tag'

export const CRAWL_WEBSITE = gql`
  mutation CrawlWebsite($url: String) {
    crawlWebsite(url: $url) {
      code
      success
      message
      website {
        url
        domain
        lastScanDate
        userId
        online
        mobile
        insight {
          json
        }
        pageLoadTime {
          duration
          durationFormated
        }
        issuesInfo {
          accessScore
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          errorCount
          warningCount
          noticeCount
          pageCount
        }
      }
    }
  }
`
