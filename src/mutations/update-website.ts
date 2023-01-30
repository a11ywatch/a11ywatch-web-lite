import gql from 'graphql-tag'

export const UPDATE_WEBSITE = gql`
  mutation UpdateWebsite(
    $url: String
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
    $standard: String
    $ua: String
    $actions: [PageActionsInput]
    $tld: Boolean
    $subdomains: Boolean
    $ignore: [String]
    $rules: [String]
    $runners: [String]
    $proxy: String
    $monitoringEnabled: Boolean
  ) {
    updateWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
      standard: $standard
      ua: $ua
      actions: $actions
      tld: $tld
      subdomains: $subdomains
      ignore: $ignore
      rules: $rules
      runners: $runners
      proxy: $proxy
      monitoringEnabled: $monitoringEnabled
    ) {
      code
      success
      message
      website {
        url
        _id
        domain
        userId
        mobile
        tld
        subdomains
        proxy
        standard
        pageInsights
        monitoringEnabled
        insight {
          json
        }
        pageHeaders {
          key
          value
        }
        actions {
          _id
          path
          events
        }
        runners
        rules
        ignore
        pages {
          domain
          url
          pageInsights
          insight {
            json
          }
          issues {
            code
            type
            selector
            message
            context
            recurrence
          }
        }
        issues {
          pageUrl
          issues {
            code
            type
            selector
            message
            context
            recurrence
          }
        }
      }
    }
  }
`
