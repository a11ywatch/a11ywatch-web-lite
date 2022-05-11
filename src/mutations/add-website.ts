import gql from 'graphql-tag'

// pageinsights added
export const ADD_WEBSITE = gql`
  mutation AddWebsite(
    $url: String!
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
  ) {
    addWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
    ) {
      website {
        url
        id
        userId
        domain
        adaScore
        adaScoreAverage
        cdnConnected
        lastScanDate
        online
        pageInsights
        mobile
        insight {
          json
        }
        script {
          id
          script
          cdnUrl
          cdnUrlMinified
        }
        pageLoadTime {
          duration
          durationFormated
          color
        }
        pageHeaders {
          key
          value
        }
        issuesInfo {
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
          cdnConnected
          skipContentIncluded
          errorCount
          warningCount
          limitedCount
        }
        issues {
          pageUrl
          issues {
            code
            type
            selector
            message
            context
          }
        }
        subDomains {
          domain
          url
          adaScore
          cdnConnected
          pageInsights
          insight {
            json
          }
          pageLoadTime {
            duration
            durationFormated
            color
          }
          issues {
            code
            type
            selector
            message
            context
            pageUrl
          }
        }
      }
      code
      success
      message
    }
  }
`
