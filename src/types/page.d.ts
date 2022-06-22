import { AppProps } from 'next/app'

export type AppComponent = AppProps['Component'] & Partial<MetaData>

export interface InnerApp {
  Component: AppComponent
  pageProps: any
  name?: string
}

export interface MergedApp extends AppProps {
  Component: AppComponent
}

export interface MetaData {
  /** Meta data page title */
  title?: string
  /** Meta data page description */
  description?: string
  /** Enable apollo gql */
  gql?: boolean
  /** Enable rest provider for a11ywatch */
  rest?: boolean
  /** Meta data properties for head */
  meta?: any
  /** ID: Component name or page name used in meta information */
  name?: string
  /** Enable intercom composer or crisp composer */
  intercom?: boolean
  /** Params for initial gql queries [todo update generic] */
  params?: any
}

interface MetaFunction extends Partial<MetaData>, Function {}

export type PageProps = {
  name: string
  website?: any
  websiteUrl?: string
}

export interface BlogPageProps extends PageProps {
  html: string
  title?: string
  links: any[]
  stylesheets: any[]
  metas: any[]
  headScripts: any[]
  bodyScripts: any[]
}
