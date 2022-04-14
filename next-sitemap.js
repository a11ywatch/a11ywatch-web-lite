module.exports = {
  siteUrl: process.env.DOMAIN_NAME || 'https://a11ywatch.com',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/alerts',
    '/dashboard',
    '/website-analytics',
    '/issues',
    '/scripts',
    '/history',
    '/payments',
    '/urgent-issues',
    '/web-issues',
    '/website-details',
    '/profile',
    '/api',
    '/404',
    '/500',
    '/offline',
    '/reports',
  ],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/*'],
        disallow: [
          '/*?*',
          '/api/*',
          '/website-details/*',
          '/iframe/*',
          '/dashboard',
          '/alerts',
          '/dashboard',
          '/alerts',
          '/profile',
          '/website-analytics',
          '/web-issues',
          '/scripts',
          '/history',
          '/urgent-issues',
          '/payments',
          '/reports/*',
        ],
      },
    ],
  },
}
