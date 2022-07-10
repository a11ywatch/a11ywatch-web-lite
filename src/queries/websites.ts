import gql from 'graphql-tag'
import { UserManager, AppManager } from '@app/managers'
import { MutationUpdaterFn } from 'apollo-client'
import {
  issueFragments,
  websiteFragments,
  subdomainFragments,
  analyticsFragments,
  scriptsFragments,
} from '@app/apollo'
import { User } from '@app/types'

const GET_WEBSITES = gql`
  ${websiteFragments}
  query getWebsites($limit: Int, $offset: Int) {
    user {
      id
      websites(limit: $limit, offset: $offset) {
        ...WebsiteParts
      }
    }
  }
`

// get a list of website to use for sorting etc.
export const GET_WEBSITES_LIST = gql`
  query getWebsitesList($limit: Int, $offset: Int) {
    user {
      id
      websites(limit: $limit, offset: $offset) {
        domain
      }
    }
  }
`

// issues paginated
export const GET_WEBSITE_ISSUES = gql`
  ${issueFragments}
  query getWebsiteIssues(
    $url: String
    $limit: Int
    $offset: Int
    $all: Boolean
  ) {
    website(url: $url) {
      ... on Website {
        _id
        issues(limit: $limit, offset: $offset, all: $all) {
          ...IssueParts
        }
      }
    }
  }
`

// pages paginated
export const GET_WEBSITE_PAGES_PAGINATED = gql`
  ${subdomainFragments}
  query getWebsitePagesPaginated($url: String, $limit: Int, $offset: Int) {
    website(url: $url) {
      ... on Website {
        _id
        pages(limit: $limit, offset: $offset) {
          ...PagesParts
        }
      }
    }
  }
`

export const GET_WEBSITE_PAGE_ACTIONS = gql`
  query getWebsitePageActions($url: String) {
    website(url: $url) {
      ... on Website {
        _id
        actions {
          _id
          path
          events
        }
      }
    }
  }
`

export const GET_WEBSITE_ANALYTICS = gql`
  ${analyticsFragments}
  query getWebsiteAnalytics(
    $url: String
    $limit: Int
    $offset: Int
    $all: Boolean
  ) {
    website(url: $url) {
      ... on Website {
        _id
        analytics(limit: $limit, offset: $offset, all: $all) {
          ...AnalyticParts
        }
      }
    }
  }
`

export const GET_WEBSITE_SCRIPTS = gql`
  ${scriptsFragments}
  query getWebsiteScripts(
    $url: String
    $limit: Int
    $offset: Int
    $all: Boolean
  ) {
    website(url: $url) {
      ... on Website {
        _id
        scripts(limit: $limit, offset: $offset, all: $all) {
          ...ScriptParts
        }
      }
    }
  }
`

// generic list without frag
export const GET_WEBSITES_INFO = gql`
  query getWebsites($limit: Int, $offset: Int) {
    user {
      id
      websites(limit: $limit, offset: $offset) {
        ... on Website {
          _id
          url
          domain
          cdnConnected
          tld
          subdomains
          issuesInfo {
            adaScore
            adaScoreAverage
            totalIssues
          }
        }
      }
    }
  }
`

// TODO: refactor pages to pages query
export const GET_PAGES = gql`
  ${subdomainFragments}
  query getWebsites($limit: Int, $offset: Int) {
    user {
      id
      websites(limit: $limit, offset: $offset) {
        ... on Website {
          _id
          url
          domain
          cdnConnected
          issuesInfo {
            adaScore
            adaScoreAverage
            totalIssues
          }
        }
        pages {
          ...PagesParts
        }
      }
    }
  }
`

export const updateCache: {
  update?: MutationUpdaterFn<any>
  last: any // last website stored in cache
  lastVariables: any
} = {
  last: [],
  lastVariables: {},
  update(cache, { data }) {
    // initial vars
    const variables = {
      userId: UserManager.getID,
      filter: '',
      limit: 5,
      offset: 0,
    }

    // TODO: pass in filter
    const query = cache.readQuery<{ user: User }>({
      query: GET_WEBSITES,
      variables,
    })

    if (query && 'user' in query) {
      const user = query?.user
      const { websites } = user ?? { websites: [] }

      let newWebSites = updateCache.last.length ? updateCache.last : websites

      const { addWebsite, removeWebsite } = data

      if (addWebsite || removeWebsite) {
        if (addWebsite) {
          if (addWebsite?.website) {
            newWebSites = newWebSites.concat(addWebsite.website)
          }
        } else if (removeWebsite) {
          const site = removeWebsite.website
          if (removeWebsite.success) {
            if (site) {
              newWebSites = websites?.filter(
                (data: any) => data.url !== site.url
              )
            } else {
              newWebSites = []
              AppManager.toggleSnack(true, removeWebsite.message, 'success')
            }
          }
        }

        const pages = newWebSites
          .reduce((acc: any, current: any) => {
            const x = acc.find((item: any) => item.url === current.url)
            if (!x) {
              return acc.concat([current])
            } else {
              return acc
            }
          }, [])
          .map((item: any) => {
            return {
              ...item,
              pages: item.pages ?? [],
              issues: item.issues ?? [],
            }
          })

        cache.writeQuery({
          query: GET_WEBSITES,
          variables,
          data: {
            user: {
              ...user,
              websites: pages,
            },
          },
        })

        updateCache.last = newWebSites
        updateCache.lastVariables = variables
      }
    }
  },
}

export { GET_WEBSITES }
