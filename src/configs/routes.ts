import { dev } from './app-config'

export const Routes = [
  {
    nav: false,
    href: '/climate',
    name: 'Climate',
    type: 'resources',
  },
  {
    nav: false,
    href: '/faq',
    name: 'FAQ',
    type: 'resources',
  },
  {
    nav: false,
    href: '/terms-of-service',
    name: 'Terms of Service',
    type: 'legal',
  },
  {
    nav: false,
    href: '/inactivity-policy',
    name: 'Inactivity Policy',
    type: 'legal',
  },
  {
    nav: false,
    href: '/brand-assets',
    name: 'Brand Assets / Logos',
    type: 'company',
  },
  {
    nav: false,
    href: '/changelog',
    name: 'Changelog',
    type: 'company',
  },
  {
    nav: false,
    href: dev ? '/blog' : 'https://a11ywatch.blog',
    name: 'Blog',
    type: 'company',
  },
  {
    nav: false,
    href: 'https://github.com/A11yWatch/a11ywatch/tree/main/cli',
    name: 'Command-Line',
    type: 'resources',
  },
  {
    nav: false,
    href: 'https://discord.com/invite/tmCzndrmMm',
    name: 'Discord',
    type: 'resources',
  },
  {
    nav: false,
    href: '/privacy',
    name: 'Privacy Policy',
    type: 'legal',
  },
  {
    nav: false,
    href: '/contact',
    name: 'Contact',
    type: 'company',
  },
  {
    nav: false,
    href: '/about',
    name: 'About',
    type: 'company',
  },
  {
    nav: false,
    href: 'https://twitter.com/A11yWatcher',
    name: 'Twitter',
    type: 'company',
  },
  {
    nav: false,
    href: '/roadmap',
    name: 'Roadmap',
    type: 'company',
  },
  {
    nav: false,
    href: '/open-source',
    name: 'Open Source Software',
    type: 'resources',
  },
  {
    nav: false,
    href: '/why-us',
    name: 'Why us?',
    type: 'resources',
  },
  {
    nav: false,
    href: '/consulting',
    name: 'Consulting',
    type: 'company',
  },
  {
    nav: false,
    href: 'https://chrome.google.com/webstore/detail/a11ywatch/opefmkkmhchekgcmgneakbjafeckbaag?hl=en&authuser=0',
    name: 'Chrome Extension',
    type: 'explore',
  },
  {
    nav: false,
    href: 'https://github.com/a11ywatch',
    name: 'Github',
    type: 'explore',
  },
  {
    nav: false,
    href: '/testout',
    name: 'Try Out',
    type: 'explore',
  },
  {
    nav: true,
    href: '/pricing',
    name: 'Pricing',
    type: 'explore',
  },
  {
    nav: false,
    href: '/api-info',
    name: 'API',
    type: 'explore',
  },
  {
    nav: false,
    href: '/website-accessibility-checker',
    name: 'Accessibility Scan',
    type: 'explore',
  },
  {
    nav: false,
    href: '/web-accessibility',
    name: 'Web Accessibility',
    type: 'resources',
  },
  {
    nav: true,
    href: '/features',
    name: 'Features',
    type: 'resources',
  },
  {
    nav: false,
    href: 'https://a11ywatch.statuspage.io',
    name: 'Status',
    type: 'resources',
  },
  {
    nav: true,
    href: '/login',
    name: 'Login',
  },
  {
    nav: true,
    href: '/register',
    name: 'Register',
  },
  {
    nav: false,
    href: 'https://docs.a11ywatch.com',
    name: 'Documentation',
    type: 'resources',
  },
]

export const LoggedInRoutes = [
  {
    nav: true,
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    nav: true,
    href: '/profile',
    name: 'Profile',
  },
  {
    nav: true,
    href: '/api-info',
    name: 'API',
  },
  {
    nav: false,
    href: '/pricing',
    name: 'Pricing',
  },
  {
    nav: false,
    href: '/register',
    name: 'Register',
  },
  {
    nav: false,
    href: '/login',
    name: 'Login',
  },
]

/*
 * Determine what routes make the auth profile menu appear by component name
 */
export const LOGGIN_ROUTES = [
  '/analytics',
  '/dashboard',
  '/profile',
  '/payments',
  '/issues',
  '/website-analytics',
  '/website-details',
  '/web-issues',
  '/web-actions',
  '/settings',
]
