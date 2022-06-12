export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Analytic = {
  __typename?: 'Analytic'
  id?: Maybe<Scalars['ID']>
  pageUrl?: Maybe<Scalars['String']>
  errorCount?: Maybe<Scalars['Int']>
  warningCount?: Maybe<Scalars['Int']>
  noticeCount?: Maybe<Scalars['Int']>
  errorOccurances?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['Int']>
  domain?: Maybe<Scalars['String']>
  adaScore?: Maybe<Scalars['Float']>
}

export type ApiUsage = {
  __typename?: 'ApiUsage'
  usage?: Maybe<Scalars['Int']>
  usageLimit?: Maybe<Scalars['Int']>
  lastScanDate?: Maybe<Scalars['String']>
}

export type BasicMutationResponse = MutationResponse & {
  __typename?: 'BasicMutationResponse'
  code: Scalars['String']
  success: Scalars['Boolean']
  message: Scalars['String']
}

export type CreatePageHeaders = {
  key: Scalars['String']
  value: Scalars['String']
}

export type Feature = {
  __typename?: 'Feature'
  id?: Maybe<Scalars['ID']>
  feature?: Maybe<Scalars['String']>
  enabled?: Maybe<Scalars['Boolean']>
  user?: Maybe<Array<Maybe<User>>>
  accountType?: Maybe<Scalars['String']>
}

export type History = {
  __typename?: 'History'
  id?: Maybe<Scalars['ID']>
  url?: Maybe<Scalars['String']>
  user?: Maybe<User>
  issues?: Maybe<Array<Maybe<Issue>>>
  pages?: Maybe<Array<Maybe<Pages>>>
  userId?: Maybe<Scalars['Int']>
  domain?: Maybe<Scalars['String']>
  cdnConnected?: Maybe<Scalars['Boolean']>
  pageLoadTime?: Maybe<PageLoadTimeMeta>
  issuesInfo?: Maybe<IssueMeta>
  pageInsights?: Maybe<Scalars['Boolean']>
  insight?: Maybe<PageInsights>
}

export type HistoryIssuesArgs = {
  filter?: Maybe<Scalars['String']>
}

// the accessibility issue details
export interface PageIssue {
  code: string
  context: string
  message: string
  runner: string // what what used for testing
  type: string
  selector: string
  typeCode: number
  recurrence?: number // amount of times issue appeared.
}

// TODO refactor
export interface Issue extends PageIssue {
  __typename?: 'Issue'
  documentTitle?: Maybe<Scalars['String']>
  issue?: Maybe<PageIssue>
  issues?: Maybe<Array<Maybe<PageIssue>>>
  domain?: Maybe<Scalars['String']>
  pageUrl?: Maybe<Scalars['String']>
}

// issue model reflection types
export interface IssueData {
  pageUrl: string
  domain: string
  issues: Partial<PageIssue[]>
}

export type IssueIssuesArgs = {
  filter?: Maybe<Scalars['String']>
}

export type IssueMeta = {
  __typename?: 'IssueMeta'
  issuesFixedByCdn?: Maybe<Scalars['Int']>
  possibleIssuesFixedByCdn?: Maybe<Scalars['Int']>
  totalIssues?: Maybe<Scalars['Int']>
  cdnConnected?: Maybe<Scalars['Boolean']>
  skipContentIncluded?: Maybe<Scalars['Boolean']>
  errorCount?: Maybe<Scalars['Int']>
  warningCount?: Maybe<Scalars['Int']>
  limitedCount?: Maybe<Scalars['Int']>
  adaScore?: number
}

export type Mutation = {
  __typename?: 'Mutation'
  register?: Maybe<User>
  login?: Maybe<User>
  logout?: Maybe<BasicMutationResponse>
  updateUser?: Maybe<UpdateUserMutationResponse>
  toggleAlert?: Maybe<UpdateUserMutationResponse>
  toggleProfile?: Maybe<UpdateUserMutationResponse>
  updateWebsite?: Maybe<UpdateWebSiteMutationResponse>
  updateScript?: Maybe<UpdateScriptMutationResponse>
  crawlWebsite?: Maybe<UpdateWebSiteMutationResponse>
  scanWebsite?: Maybe<UpdateWebSiteMutationResponse>
  forgotPassword?: Maybe<User>
  confirmEmail?: Maybe<UpdateUserMutationResponse>
  resetPassword?: Maybe<User>
  addWebsite?: Maybe<UpdateWebSiteMutationResponse>
  filterEmailDates?: Maybe<User>
  removeWebsite?: Maybe<UpdateWebSiteMutationResponse>
  addPaymentSubscription?: Maybe<UpdateUserMutationResponse>
  cancelSubscription?: Maybe<UpdateUserMutationResponse>
}

export type MutationRegisterArgs = {
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
  googleId?: Maybe<Scalars['String']>
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password?: Maybe<Scalars['String']>
  googleId?: Maybe<Scalars['String']>
}

export type MutationUpdateUserArgs = {
  password?: Maybe<Scalars['String']>
  newPassword?: Maybe<Scalars['String']>
  stripeToken?: Maybe<Scalars['String']>
}

export type MutationToggleAlertArgs = {
  alertEnabled?: Maybe<Scalars['Boolean']>
}

export type MutationToggleProfileArgs = {
  toggleAlert?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateWebsiteArgs = {
  url?: Maybe<Scalars['String']>
  customHeaders?: Maybe<Array<Maybe<CreatePageHeaders>>>
  pageInsights?: Maybe<Scalars['Boolean']>
}

export type MutationUpdateScriptArgs = {
  url?: Maybe<Scalars['String']>
  scriptMeta?: Maybe<ScriptMetaInput>
  editScript?: Maybe<Scalars['Boolean']>
  newScript?: Maybe<Scalars['String']>
}

export type MutationCrawlWebsiteArgs = {
  url?: Maybe<Scalars['String']>
}

export type MutationScanWebsiteArgs = {
  url?: Maybe<Scalars['String']>
}

export type MutationForgotPasswordArgs = {
  email?: Maybe<Scalars['String']>
}

export type MutationConfirmEmailArgs = {
  email?: Maybe<Scalars['String']>
}

export type MutationResetPasswordArgs = {
  email?: Maybe<Scalars['String']>
  resetCode?: Maybe<Scalars['String']>
  jwt?: Maybe<Scalars['String']>
}

export type MutationAddWebsiteArgs = {
  url: Scalars['String']
  customHeaders?: Maybe<Array<Maybe<CreatePageHeaders>>>
  pageInsights?: Maybe<Scalars['Boolean']>
}

export type MutationFilterEmailDatesArgs = {
  emailFilteredDates?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type MutationRemoveWebsiteArgs = {
  url?: Maybe<Scalars['String']>
  deleteMany?: Maybe<Scalars['Boolean']>
}

export type MutationAddPaymentSubscriptionArgs = {
  email?: Maybe<Scalars['String']>
  stripeToken?: Maybe<Scalars['String']>
  yearly?: Maybe<Scalars['Boolean']>
}

export type MutationCancelSubscriptionArgs = {
  email?: Maybe<Scalars['String']>
}

export type MutationResponse = {
  code: Scalars['String']
  success: Scalars['Boolean']
  message: Scalars['String']
}

export type PageHeaders = {
  __typename?: 'PageHeaders'
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type PageInsights = {
  __typename?: 'PageInsights'
  json?: Maybe<Scalars['String']>
}

export type PageLoadTimeMeta = {
  __typename?: 'PageLoadTimeMeta'
  duration?: Maybe<Scalars['Int']>
  durationFormated?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
}

export type PaymentPlan = {
  __typename?: 'PaymentPlan'
  id?: Maybe<Scalars['String']>
  object?: Maybe<Scalars['String']>
  active?: Maybe<Scalars['Boolean']>
  amount?: Maybe<Scalars['Int']>
  amount_decimal?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  currency?: Maybe<Scalars['String']>
  interval?: Maybe<Scalars['String']>
  product?: Maybe<Scalars['String']>
}

export type PaymentSubScription = {
  __typename?: 'PaymentSubScription'
  id?: Maybe<Scalars['String']>
  object?: Maybe<Scalars['String']>
  application_fee_percent?: Maybe<Scalars['Int']>
  billing_cycle_anchor?: Maybe<Scalars['Int']>
  cancel_at_period_end?: Maybe<Scalars['Boolean']>
  customer?: Maybe<Scalars['String']>
  ended_at?: Maybe<Scalars['String']>
  canceled_at?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  start_date?: Maybe<Scalars['String']>
  plan?: Maybe<PaymentPlan>
  days_until_due?: Maybe<Scalars['String']>
  current_period_end?: Maybe<Scalars['String']>
  current_period_start?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['String']>
  collection_method?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  features?: Maybe<Array<Maybe<Feature>>>
  websites?: Maybe<Array<Maybe<Website>>>
  website?: Maybe<Website>
  pages?: Maybe<Array<Maybe<Pages>>>
  issues?: Maybe<Array<Maybe<Issue>>>
  history?: Maybe<Array<Maybe<History>>>
  analytics?: Maybe<Array<Maybe<Analytic>>>
  scripts?: Maybe<Array<Maybe<Script>>>
  script?: Maybe<Script>
  issue?: Maybe<Issue>
  user?: Maybe<User>
}

export type QueryWebsitesArgs = {
  filter?: Maybe<Scalars['String']>
}

export type QueryWebsiteArgs = {
  url?: Maybe<Scalars['String']>
}

export type QuerySubDomainsArgs = {
  filter?: Maybe<Scalars['String']>
}

export type QueryIssuesArgs = {
  filter?: Maybe<Scalars['String']>
}

export type QueryHistoryArgs = {
  filter?: Maybe<Scalars['String']>
}

export type QueryAnalyticsArgs = {
  filter?: Maybe<Scalars['String']>
}

export type QueryScriptsArgs = {
  filter?: Maybe<Scalars['String']>
}

export type QueryScriptArgs = {
  filter?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type QueryIssueArgs = {
  url?: Maybe<Scalars['String']>
}

export type ScanInformation = {
  __typename?: 'ScanInformation'
  lastScanDate?: Maybe<Scalars['String']>
  scanAttempts?: Maybe<Scalars['Int']>
}

export type Script = {
  __typename?: 'Script'
  id?: Maybe<Scalars['ID']>
  pageUrl?: Maybe<Scalars['String']>
  domain?: Maybe<Scalars['String']>
  script?: Maybe<Scalars['String']>
  cdnUrl?: Maybe<Scalars['String']>
  cdnUrlMinified?: Maybe<Scalars['String']>
  cdnConnected?: Maybe<Scalars['Boolean']>
  issueMeta?: Maybe<IssueMeta>
  scriptMeta?: Maybe<ScriptMeta>
}

export type ScriptMeta = {
  __typename?: 'ScriptMeta'
  skipContentEnabled?: Maybe<Scalars['Boolean']>
  translateEnabled?: Maybe<Scalars['Boolean']>
}

export type ScriptMetaInput = {
  skipContentEnabled?: Maybe<Scalars['Boolean']>
  translateEnabled?: Maybe<Scalars['Boolean']>
}

export type Pages = {
  __typename?: 'Pages'
  id?: Maybe<Scalars['ID']>
  url?: Maybe<Scalars['String']>
  user?: Maybe<User>
  domain?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['Int']>
  cdnConnected?: Maybe<Scalars['Boolean']>
  pageLoadTime?: Maybe<PageLoadTimeMeta>
  issues?: Maybe<Array<Maybe<Issue>>>
  issuesInfo?: Maybe<IssueMeta>
  pageInsights?: Maybe<Scalars['Boolean']>
  insight?: Maybe<PageInsights>
}

export type SubDomainIssuesArgs = {
  filter?: Maybe<Scalars['String']>
}

export type Subscription = {
  __typename?: 'Subscription'
  websiteAdded?: Maybe<Website>
  issueAdded?: Maybe<Issue>
  emailVerified?: Maybe<User>
  websiteRemoved?: Maybe<Website>
}

export type SubscriptionWebsiteAddedArgs = {
  userId?: Maybe<Scalars['Int']>
}

export type SubscriptionIssueAddedArgs = {
  userId?: Maybe<Scalars['Int']>
}

export type SubscriptionEmailVerifiedArgs = {
  userId?: Maybe<Scalars['Int']>
}

export type UpdateScriptMutationResponse = MutationResponse & {
  __typename?: 'UpdateScriptMutationResponse'
  code: Scalars['String']
  success: Scalars['Boolean']
  message: Scalars['String']
  script?: Maybe<Script>
}

export type UpdateUserMutationResponse = MutationResponse & {
  __typename?: 'UpdateUserMutationResponse'
  code: Scalars['String']
  success: Scalars['Boolean']
  message: Scalars['String']
  user?: Maybe<User>
  alertEnabled?: Maybe<Scalars['Boolean']>
  profileVisible?: Maybe<Scalars['Boolean']>
}

export type UpdateWebSiteMutationResponse = MutationResponse & {
  __typename?: 'UpdateWebSiteMutationResponse'
  code: Scalars['String']
  success: Scalars['Boolean']
  message: Scalars['String']
  website?: Maybe<Website>
}

export type User = {
  __typename?: 'User'
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  jwt?: Maybe<Scalars['String']>
  salt?: Maybe<Scalars['String']>
  loggedIn?: Maybe<Scalars['Boolean']>
  passwordRequired?: Maybe<Scalars['Boolean']>
  alertEnabled?: Maybe<Scalars['Boolean']>
  lastAlertSent?: Maybe<Scalars['Int']>
  stripeToken?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['Int']>
  activeSubscription?: Maybe<Scalars['Boolean']>
  emailConfirmed?: Maybe<Scalars['Boolean']>
  emailFilteredDates?: Maybe<Array<Maybe<Scalars['Int']>>>
  websites?: Maybe<Array<Maybe<Website>>>
  profileVisible?: Maybe<Scalars['Boolean']>
  history?: Maybe<Array<Maybe<History>>>
  scanInfo?: Maybe<ScanInformation>
  analytics?: Maybe<Array<Maybe<Analytic>>>
  scripts?: Maybe<Array<Maybe<Script>>>
  script?: Maybe<Script>
  paymentSubscription?: Maybe<PaymentSubScription>
  apiUsage?: Maybe<ApiUsage>
  websiteLimit?: Maybe<Scalars['Int']>
  downAlerts?: Maybe<Array<Maybe<Website>>>
  googleId?: Maybe<Scalars['String']>
  emailExpDate?: Maybe<Scalars['String']>
  resetCode?: Maybe<Scalars['String']>
  stripeID?: Maybe<Scalars['String']>
}

export type UserAnalyticsArgs = {
  filter?: Maybe<Scalars['String']>
}

export type UserScriptsArgs = {
  filter?: Maybe<Scalars['String']>
}

export type UserScriptArgs = {
  filter?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type Website = {
  __typename?: 'Website'
  _id?: Maybe<Scalars['ID']>
  url?: Maybe<Scalars['String']>
  user?: Maybe<User>
  userId?: Maybe<Scalars['Int']>
  domain: Scalars['String']
  cdnConnected?: Maybe<Scalars['Boolean']>
  pageLoadTime?: Maybe<PageLoadTimeMeta>
  issues?: Maybe<Issue>
  issue?: Maybe<Array<Maybe<PageIssue>>>
  issuesInfo?: Maybe<IssueMeta>
  pages?: Maybe<Array<Maybe<Pages>>>
  script?: Maybe<Script>
  lastScanDate?: Maybe<Scalars['String']>
  documentTitle?: Maybe<Scalars['String']>
  cdn?: Maybe<Scalars['String']>
  pageHeaders?: Maybe<Array<Maybe<PageHeaders>>>
  online?: Maybe<Scalars['Boolean']>
  timestamp?: Maybe<Scalars['String']>
  pageInsights?: Maybe<Scalars['Boolean']>
  insight?: Maybe<PageInsights>
}

export type WebsiteIssuesArgs = {
  filter?: Maybe<Scalars['String']>
}

export type { BlogPageProps, MetaData, MergedApp, PageProps } from './page'
