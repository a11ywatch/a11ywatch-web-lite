import gql from 'graphql-tag'

const GET_WEBSITE = gql`
  query getWebsite($url: String) {
    website(url: $url) {
      url
      userId
      domain
      adaScore
      cdnConnected
      timestamp
      online
      pageInsights
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
      }
      issues {
        pageUrl
      }
    }
  }
`

const GET_WEBSITE_HTML = gql`
  query getWebsite($url: String) {
    website(url: $url) {
      id
      url
    }
  }
`

export { GET_WEBSITE_HTML, GET_WEBSITE }
