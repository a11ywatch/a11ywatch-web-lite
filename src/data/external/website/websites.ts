import { useState, useEffect, useCallback, useReducer, useMemo } from 'react'
import {
  useQuery,
  useMutation,
  useSubscription,
  useLazyQuery,
} from '@apollo/react-hooks'
import {
  ADD_WEBSITE,
  REMOVE_WEBSITE,
  UPDATE_WEBSITE,
  CRAWL_WEBSITE,
  SCAN_WEBSITE,
} from '@app/mutations'
import { GET_WEBSITES, GET_WEBSITES_INFO, updateCache } from '@app/queries'
import {
  ISSUE_SUBSCRIPTION,
  CRAWL_COMPLETE_SUBSCRIPTION,
} from '@app/subscriptions'
import { AppManager, HomeManager } from '@app/managers'
import type { Website } from '@app/types'
import { useWasmContext } from '@app/components/providers'
import { LIGHTHOUSE_RESULT } from '@app/subscriptions/lighthouse'
import { removeTrailingSlash } from '@a11ywatch/website-source-builder'
import { upgradeRequired } from '@app/managers/app'
import { useInteractiveContext } from '@app/components/providers/interactive'

// fetch more items
const updateQuery = (prev: any, { fetchMoreResult }: any) => {
  if (!fetchMoreResult || !fetchMoreResult?.user?.websites?.length) {
    AppManager.toggleSnack(true, 'No more websites exist.')
    return prev
  }

  const websites = [...prev?.user?.websites, ...fetchMoreResult?.user?.websites]

  return Object.assign({}, prev, {
    user: {
      ...prev?.user,
      websites,
    },
  })
}

/*
 * This hook returns all the queries, mutations, and subscriptions between your Website with the graphs,
 * Pages, and Issues with pagination.
 * @example const {data} = useWebsiteData(); // returns websites
 * @example const {data} = useWebsiteData('', 'www.somepage.com', null, false); bind to a website for mutations.
 *
 */
export const useWebsiteData = (
  filter: string = '',
  url: string = '',
  customHeaders: any = null,
  skip: boolean = false,
  scopedQuery: string = ''
) => {
  const { feed } = useWasmContext()
  const { setSelectedWebsite } = useInteractiveContext()
  const [_, forceUpdate] = useReducer((x) => x + 1, 0) // top level force update state
  const [lighthouseVisible, setLighthouseVisibility] = useState<boolean>(true)
  const [feedOpen, setIssueFeedContent] = useState<boolean>(false)
  const [activeCrawls, setActiveCrawl] = useState<
    { [key: string]: boolean } | Record<string, any>
  >({})

  // get vars for querys
  const { variables, pageVars } = useMemo(() => {
    return {
      variables: {
        filter,
        customHeaders,
        url,
      },
      pageVars: {
        filter,
        customHeaders,
        url,
        limit: 4, // todo: use default config var
        offset: 0,
      },
    }
  }, [filter, customHeaders, url])

  // start of main queries for pages. Root gets all
  const [getWebsites, { data, loading, refetch, error, fetchMore }] =
    useLazyQuery(GET_WEBSITES, {
      variables: pageVars,
    })

  // Only get issues from websites
  const {
    data: issuesResults,
    loading: issueDataLoading,
    fetchMore: fetchMoreIssues,
    networkStatus: networkStatusIssues,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: pageVars,
    skip: scopedQuery !== 'issues',
    ssr: false,
  })

  // Get Website Pages
  const {
    data: pagesResults,
    loading: pagesDataLoading,
    fetchMore: fetchMorePages,
    networkStatus: networkStatusPages,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: pageVars,
    skip: scopedQuery !== 'pages',
    ssr: false,
  })

  // Get Website Analytics
  const {
    data: analyticsResults,
    loading: analyticsDataLoading,
    fetchMore: fetchMoreAnalytics,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: pageVars,
    skip: scopedQuery !== 'analytics',
    ssr: false,
  })

  // Get Scripts Pages
  const {
    data: actionResults,
    loading: actionsDataLoading,
    fetchMore: fetchMoreActions,
  } = useQuery(GET_WEBSITES_INFO, {
    variables: pageVars,
    ssr: false,
    skip: scopedQuery !== 'actions',
  })

  const [removeWebsite, { loading: removeLoading }] = useMutation(
    REMOVE_WEBSITE,
    updateCache
  )
  const [addWebsiteMutation, { data: addWebsiteData, loading: addLoading }] =
    useMutation(ADD_WEBSITE, updateCache)
  const [updateWebsite, { data: updateData }] = useMutation(UPDATE_WEBSITE, {
    variables,
  })

  // trigger events to gather issues
  const [crawl, { loading: crawlLoading }] = useMutation(CRAWL_WEBSITE)
  const [scan, { loading: scanLoading }] = useMutation(SCAN_WEBSITE)

  // SCOPE WEBSITE DATA PER ROUTE (ALL, ISSUES, PAGES)
  const websites = useMemo(() => {
    return data?.user?.websites || []
  }, [data])
  const issueData = useMemo(() => {
    return issuesResults?.user?.websites || []
  }, [issuesResults])
  const pagesData = useMemo(() => {
    return pagesResults?.user?.websites || []
  }, [pagesResults])
  const analyticsData = useMemo(() => {
    return analyticsResults?.user?.websites || []
  }, [analyticsResults])

  const actionsData = useMemo(() => {
    return actionResults?.user?.websites || []
  }, [actionResults])

  // website crawl finished
  const onCrawlCompleteSubscription = useCallback(
    async ({ subscriptionData }: { subscriptionData: any }) => {
      const completedWebsite = subscriptionData?.data?.crawlComplete

      // website did not complete due to time elasped across pages
      if (completedWebsite) {
        setTimeout(async () => {
          const accessScoreAverage = completedWebsite.accessScoreAverage

          if (completedWebsite.shutdown) {
            AppManager.toggleSnack(
              true,
              `Crawl did not complete for ${completedWebsite.domain}. Upgrade your account for a larger scan uptime.`,
              'error',
              false,
              true
            )
          } else {
            AppManager.toggleSnack(
              true,
              `Crawl finished for ${completedWebsite.domain}. Average score across pages ${accessScoreAverage}`,
              'success'
            )

            setTimeout(() => {
              AppManager.closeSnack()
            }, 6000)
          }

          // TODO: check crawl tld and subdomain types for crawl targeting.
          setActiveCrawl((v) => ({
            ...v,
            [completedWebsite.domain]: false,
          }))

          if (refetch) {
            await refetch().catch((e) => {
              console.error(e)
            })
          }
        }, 500)
      }
    },
    [refetch, setActiveCrawl]
  )

  useEffect(() => {
    const updatedWebsite = updateData && updateData?.updateWebsite?.website

    if (updatedWebsite) {
      const dataSource = websites.find(
        (source: Website) => source.domain === updatedWebsite?.domain
      )

      if (dataSource) {
        if (updatedWebsite?.pageHeaders) {
          dataSource.pageHeaders = updatedWebsite.pageHeaders
        }

        // todo move to toggle feedback
        if (dataSource.pageInsights !== updatedWebsite.pageInsights) {
          AppManager.toggleSnack(
            true,
            `Success lighthouse ${
              updatedWebsite.pageInsights ? 'enabled' : 'disabled'
            }`,
            'success'
          )
        }

        dataSource.pageInsights = updatedWebsite.pageInsights

        // todo: remove hard state updates
        forceUpdate()
      }
    }
  }, [websites, updateData, forceUpdate])

  useEffect(() => {
    if (addWebsiteData && !addWebsiteData?.addWebsite?.success) {
      const message = addWebsiteData.addWebsite.message

      AppManager.toggleSnack(
        true,
        message,
        'message',
        false,
        upgradeRequired(message)
      )
    }
  }, [addWebsiteData])

  useSubscription(CRAWL_COMPLETE_SUBSCRIPTION, {
    onSubscriptionData: onCrawlCompleteSubscription,
  })

  const onIssueSubscription = useCallback(
    ({ subscriptionData }: any) => {
      const newIssue = subscriptionData?.data?.issueAdded
      const issuesInfo = newIssue?.issuesInfo

      setTimeout(() => {
        feed?.insert_website({
          domain: newIssue.domain,
          issues: newIssue.issue,
          pageUrl: newIssue.pageUrl || newIssue.url,
          pageInsights: !!newIssue.pageInsights,
          issuesInfo: issuesInfo
            ? {
                accessScore: issuesInfo.accessScore,
                totalIssues: issuesInfo.totalIssues,
                errorCount: issuesInfo.errorCount,
                warningCount: issuesInfo.warningCount,
                noticeCount: issuesInfo.noticeCount,
                possibleIssuesFixedByCdn: issuesInfo.possibleIssuesFixedByCdn,
                issuesFixedByCdn: issuesInfo.issuesFixedByCdn,
                issueMeta: {
                  skipContentIncluded:
                    issuesInfo?.issueMeta?.skipContentIncluded,
                },
              }
            : null,
          pageLoadTime: newIssue.pageLoadTime
            ? {
                duration: newIssue.pageLoadTime.duration,
                durationFormated: newIssue.pageLoadTime.durationFormated,
              }
            : null,
        })
      })
    },
    [feed]
  )

  const onLighthouseResult = useCallback(
    ({ subscriptionData }: any) => {
      const results = subscriptionData?.data?.lighthouseResult

      setTimeout(() => {
        const dataSource = websites.find(
          (source: Website) => source.domain === results?.domain
        )

        const feedItem = feed.get_page(results.domain, results.url)

        if (feedItem && feedItem.domain) {
          feed.insert_website({
            pageUrl: results.url,
            pageInsights: true,
            domain: results.domain,
            issues: (feedItem && feedItem.issues) || [],
            pageLoadTime: feedItem.pageLoadTime,
            issuesInfo: feedItem.issueInfo,
          })
        }

        if (dataSource && dataSource.url === removeTrailingSlash(results.url)) {
          dataSource.insight = results.insight
          forceUpdate()
        }

        AppManager.toggleSnack(
          true,
          `Lighthouse result finished for ${results.url}!`
        )
      })
    },
    [feed, websites, forceUpdate]
  )

  const { data: issueSubData } = useSubscription(ISSUE_SUBSCRIPTION, {
    onSubscriptionData: onIssueSubscription,
    skip,
  })

  useSubscription(LIGHTHOUSE_RESULT, {
    onSubscriptionData: onLighthouseResult,
    skip,
  })

  // full domain crawl for reports
  const crawlWebsite = useCallback(
    async (params: any) => {
      let crawling = null
      try {
        crawling = await crawl(params)
      } catch (e) {
        console.error(e)
      }

      if (crawling) {
        const domain = new URL(params.variables.url).hostname

        setActiveCrawl((v) => ({
          ...v,
          [domain]: true,
        }))
      }
    },
    [setActiveCrawl, crawl]
  )

  const singlePageScan = async (params: any) => {
    const canScan = await scan(params)

    return canScan?.data?.scanWebsite?.website
  }

  // dashboard page pagination
  const onLoadMoreWebsites = useCallback(async () => {
    try {
      await fetchMore({
        query: GET_WEBSITES,
        variables: {
          offset: Number(websites.length || 0),
        },
        updateQuery,
      })
    } catch (e) {
      console.error(e)
    }
  }, [websites, fetchMore])

  // issue page pagination
  const onLoadMoreIssues = useCallback(async () => {
    if (!issueDataLoading) {
      try {
        await fetchMoreIssues({
          query: GET_WEBSITES_INFO,
          variables: {
            offset: Number(issueData.length || 0),
          },
          updateQuery,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [issueData, fetchMoreIssues, issueDataLoading])

  // pages page pagination
  const onLoadMorePages = useCallback(async () => {
    if (!pagesDataLoading) {
      try {
        await fetchMorePages({
          query: GET_WEBSITES_INFO,
          variables: {
            offset: Number(pagesData.length || 0),
          },
          updateQuery,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [pagesData, fetchMorePages, pagesDataLoading])

  // analytics page pagination
  const onLoadMoreAnalytics = useCallback(async () => {
    if (!analyticsDataLoading) {
      try {
        await fetchMoreAnalytics({
          query: GET_WEBSITES_INFO,
          variables: {
            offset: Number(analyticsData.length || 0),
          },
          updateQuery,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [analyticsData, fetchMoreAnalytics, analyticsDataLoading])

  // actions page pagination
  const onLoadMoreActions = useCallback(async () => {
    if (!actionsDataLoading) {
      try {
        await fetchMoreActions({
          query: GET_WEBSITES_INFO,
          variables: {
            offset: Number(actionsData.length || 0),
          },
          updateQuery,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [actionsData, fetchMoreActions, actionsDataLoading])

  // toggle the live feed menu
  const setFeed = (open: boolean) => setIssueFeedContent(open)

  // add a website to monitor
  const addWebPage = async (params: any) => {
    try {
      const { data: ds } = (await addWebsiteMutation(params)) ?? { data: null }

      if (ds?.addWebsite?.success && ds?.addWebsite?.website?.domain) {
        setActiveCrawl((v) => ({
          ...v,
          [ds.addWebsite.website.domain]: true,
        }))
        if (HomeManager.selectedWebsite) {
          const wurl = ds?.addWebsite?.website?.url
          HomeManager.setDashboardView(wurl)
          setSelectedWebsite(wurl)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites, // TODO: rename to websites.
    issueData, // [scoped] collection of issues
    pagesData, // [scoped] collection of pages
    analyticsData, // [scoped] collection of analytics
    actionsData, // [scopred] collection of actions
    analyticsDataLoading, // [scoped] analytics loading]
    pagesDataLoading, // [scoped] pages loading
    issueDataLoading, // [scoped] issues loading
    actionsDataLoading, // [scoped] issues loading
    loading,
    error, // general mutation error
    mutatationLoading:
      removeLoading || addLoading || crawlLoading || scanLoading,
    lighthouseVisible,
    setLighthouseVisibility,
    removeWebsite,
    addWebsite: addWebPage,
    refetch,
    crawlWebsite,
    singlePageScan, // single page web scan
    updateWebsite,
    setIssueFeedContent: setFeed,
    // pagination
    onLoadMoreWebsites,
    onLoadMoreIssues,
    onLoadMorePages,
    onLoadMoreAnalytics,
    onLoadMoreActions,
    // other state
    activeCrawls,
    // mobile feed open
    feedOpen,
    // forceupdate
    forceUpdate,
    // network status
    networkStatusIssues,
    networkStatusPages,
    // lazy queries
    getWebsites,
  }
}
