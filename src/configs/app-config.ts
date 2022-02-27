const dev = process.env.NODE_ENV !== 'production'
const AppConfig = {
  graphQLUrl: process.env.API,
  graphQLUrlDocker: process.env.API_URI_DOCKER || process.env.API,
  webSocketUrl: process.env.WEB_SOCKET_URL,
  dev,
}

const SCRIPTS_CDN_URL_HOST =
  process.env.SCRIPTS_CDN_URL_HOST || 'http://localhost:8090'
const INTERCOM_APPID = process.env.INTERCOM_APPID
const APP_TYPE = process.env.APP_TYPE || 'main'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const STRIPE_KEY =
  process.env.STRIPE_KEY || 'pk_test_enc1gdton1T8NXa7dP5VOlHM00EyC4zqsX' // stripe.com default test key
const SUPER_MODE = process.env.SUPER_MODE
const INTERCOM_ENABLED = process.env.INTERCOM_ENABLED
const API_URI_DOCKER = process.env.API_URI_DOCKER
const DOMAIN_NAME = process.env.DOMAIN_NAME
const cdn = process.env.CDN || 'localhost:8090'

const companyName = process.env.COMPANY_NAME || 'A11yWatch'
const twitterSite = process.env.TWITTER_SITE || '@a11ywatcher'

const BASE_GQL_URL = `${AppConfig?.graphQLUrl
  ?.replace('api.', '')
  ?.replace('8080', '3000')
  ?.replace('/graphql', '')}/reports`

const STATUS_URL = `${AppConfig?.graphQLUrl?.replace('/graphql', '/status')}`

export {
  BASE_GQL_URL,
  STATUS_URL,
  DOMAIN_NAME,
  dev,
  API_URI_DOCKER,
  AppConfig,
  SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID,
  GOOGLE_CLIENT_ID,
  APP_TYPE,
  STRIPE_KEY,
  SUPER_MODE,
  INTERCOM_ENABLED,
  cdn,
  companyName,
  twitterSite,
}
