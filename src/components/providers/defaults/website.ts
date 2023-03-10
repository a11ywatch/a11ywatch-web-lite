import { ApolloError } from 'apollo-client'
import type { QueryLazyOptions } from '@apollo/react-hooks'

// default provider data for application.
export const sharedWebsiteDefaults = {
  feedOpen: false,
  loading: false,
  mutatationLoading: false as boolean,
  data: [],
  error: undefined as ApolloError | undefined,
  subscriptionData: {
    issueSubData: null,
  },
  activeCrawls: {},
  // issues only TODO: MOVE TO SEPERATE PROVIDER
  issueData: [],
  pagesData: [],
  analyticsData: [],
  actionsData: [],
  pagesDataLoading: false,
  issueDataLoading: false,
  actionsDataLoading: false,
  analyticsDataLoading: false,
  // visuals
  lighthouseVisible: true,
  // status
  networkStatusIssues: 1,
  networkStatusPages: 1,
  refetch: (_: any): Promise<any> => {
    return _
  },
  addWebsite: (_: any): Promise<any> => {
    return _
  },
  removeWebsite: (_: any): Promise<any> => {
    return _
  },
  crawlWebsite: (_: any): Promise<any> => {
    return _
  },
  updateWebsite: (_: any): Promise<any> => {
    return _
  },
  setIssueFeedContent: (_open: boolean): void => {
    return
  },
  singlePageScan: (_: any): Promise<any> => {
    return _
  },
  // TODO: move UI control
  setLighthouseVisibility: (_: any): void => {
    return _
  },
  onLoadMoreWebsites: (_: any): Promise<any> => {
    return _
  },
  onLoadMoreIssues: (_: any): Promise<any> => {
    return _
  },
  onLoadMorePages: (_: any): Promise<any> => {
    return _
  },
  onLoadMoreAnalytics: (_: any): Promise<any> => {
    return _
  },
  onLoadMoreActions: (_: any): Promise<any> => {
    return _
  },
  forceUpdate: (): void => {
    return
  },
  getWebsites: (
    _options?:
      | QueryLazyOptions<{
          filter: string
          customHeaders: any
          url: string
          limit: number
          offset: number
        }>
      | undefined
  ) => {
    return
  },
}
