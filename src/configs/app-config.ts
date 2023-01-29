const dev = process.env.NODE_ENV !== 'production'

const DEFAULT_API_URL = '127.0.0.1:3280'

const api = process.env.API || `http://${DEFAULT_API_URL}/graphql`

const AppConfig = {
  graphQLUrl: api,
  webSocketUrl: process.env.WEB_SOCKET_URL || `ws://${DEFAULT_API_URL}/graphql`,
}

// GOOGLE AUTH
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

// STRIPE
const STRIPE_KEY =
  process.env.STRIPE_KEY || 'pk_test_enc1gdton1T8NXa7dP5VOlHM00EyC4zqsX' // stripe.com default test key

// blog url endpoint
const BLOG_WEBFLOW_URL =
  process.env.BLOG_WEBFLOW_URL || 'https://a11ywatch-blog.webflow.io'

// browser facing (proxy access from central api)

const SUPER_MODE = process.env.NEXT_PUBLIC_SUPER_MODE

// the front-end domain name
const DOMAIN_NAME =
  process.env.NEXT_PUBLIC_DOMAIN_NAME ||
  process.env.DOMAIN_NAME ||
  'https://a11ywatch.com'

const companyName = process.env.COMPANY_NAME || 'A11yWatch'
const twitterSite = process.env.TWITTER_SITE || 'a11ywatcher'

const STATUS_URL = AppConfig?.graphQLUrl?.replace('/graphql', '/status')

export const REST_API = api.replace('/graphql', '')

// USED FOR REPORTS ( TODO REVISIT URL )
const BASE_GQL_URL = `${AppConfig?.graphQLUrl
  ?.replace('api.', '')
  ?.replace('3280', '3000')
  ?.replace('/graphql', '')}/reports`

export {
  BLOG_WEBFLOW_URL,
  BASE_GQL_URL,
  STATUS_URL,
  DOMAIN_NAME,
  dev,
  AppConfig,
  GOOGLE_CLIENT_ID,
  STRIPE_KEY,
  SUPER_MODE,
  companyName,
  twitterSite,
}
