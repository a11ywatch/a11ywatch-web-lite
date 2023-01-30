import { websiteFragments } from '@app/apollo'
import gql from 'graphql-tag'

export const ADD_WEBSITE = gql`
  ${websiteFragments}
  mutation AddWebsite(
    $url: String!
    $customHeaders: [CreatePageHeaders]
    $pageInsights: Boolean
    $mobile: Boolean
    $standard: String
    $ua: String
    $actions: [PageActionsInput]
    $robots: Boolean
    $subdomains: Boolean
    $tld: Boolean
    $ignore: [String]
    $rules: [String]
    $runners: [String]
    $proxy: String
    $sitemap: Boolean
    $monitoringEnabled: Boolean
  ) {
    addWebsite(
      url: $url
      customHeaders: $customHeaders
      pageInsights: $pageInsights
      mobile: $mobile
      standard: $standard
      ua: $ua
      actions: $actions
      robots: $robots
      subdomains: $subdomains
      tld: $tld
      ignore: $ignore
      rules: $rules
      runners: $runners
      proxy: $proxy
      sitemap: $sitemap
      monitoringEnabled: $monitoringEnabled
    ) {
      website {
        ...WebsiteParts
      }
      code
      success
      message
    }
  }
`
