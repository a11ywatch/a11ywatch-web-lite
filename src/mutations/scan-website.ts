import gql from 'graphql-tag'

// single page website scan
const SCAN_WEBSITE = gql`
  mutation ScanWebsite($url: String) {
    scanWebsite(url: $url) {
      code
      success
      message
      website {
        _id
        url
        domain
        userId
        lastScanDate
        timestamp
        online
        mobile
        pageLoadTime {
          duration
          durationFormated
        }
        pageHeaders {
          key
          value
        }
        issuesInfo {
          accessScore
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          errorCount
          warningCount
        }
        issue {
          code
          type
          message
          context
          selector
          runner
        }
      }
    }
  }
`

export { SCAN_WEBSITE }
