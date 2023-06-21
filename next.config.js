const dev = process.env.NODE_ENV === 'development'

// replace with only exact domain name without protocol
const DOMAIN_NAME =
  process.env.NEXT_PUBLIC_DOMAIN_NAME ||
  process.env.DOMAIN_NAME ||
  'https://a11ywatch.com'

const env = {
  dev,
  API: process.env.API,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
  STRIPE_KEY: process.env.STRIPE_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  DOCKER_CONTAINER: process.env.DOCKER_CONTAINER === 'true', // app is using docker runtime
  CDN: process.env.CDN, // single CDN for app assets
  NEXT_PUBLIC_DOMAIN_NAME: DOMAIN_NAME,
  NEXT_PUBLIC_SUPER_MODE: process.env.SUPER_MODE === 'true' ? true : false,
}

let domains = []

if (dev) {
  domains.push('127.0.0.1', 'localhost', `cdn.${DOMAIN_NAME}`)
}

// comma seperated list of cdns to use
const CDN_HOST = process.env.CDN_URL_HOST

if (CDN_HOST) {
  if (CDN_HOST.includes(',')) {
    const temp = CDN_HOST.split(',')
    domains = domains.concat(temp)
  } else {
    domains.push(CDN_HOST)
  }
}

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
]

if (DOMAIN_NAME.includes('a11ywatch')) {
  const ContentSecurityPolicy = `
    frame-ancestors 'self' https://*.a11ywatch.com https://*.a11ywatch.blog;
  `
  securityHeaders.push({
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  })
}

// app configuration
let nextJSConfigs = {
  experimental: {
    nextScriptWorkers: false,
  },
  httpAgentOptions: {
    keepAlive: false,
  },
  images: {
    unoptimized: process.env.IMAGES_UNOPTIMIZED ? true : false,
    domains,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  generateBuildId: async () =>
    process.env.SOURCE_VERSION
      ? `cust-next-build-${process.env.SOURCE_VERSION}`
      : null,
  env,
  poweredByHeader: false,
  // reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    return config
  },
}

if (process.env.PWA_ENABLED !== "0") {
  const withPWA = require('next-pwa')({
    dest: 'public',
    mode: process.env.WORKBOX_MODE || 'production',
    disable: dev,
    publicExcludes: ['!robots.txt', '!sitemap.xml.gz'],
    buildExcludes: [
      /chunks\/images\/.*$/,
      /middleware-manifest\.json$/,
      /middleware-runtime.js$/,
      /_middleware.js$/,
      /_middleware.js.map$/,
      /_next\/server\/middleware-manifest\.json$/,
      /_next\/server\/middleware-runtime.js$/
    ],
  })
  
  nextJSConfigs = withPWA(nextJSConfigs)
}

module.exports = nextJSConfigs;
