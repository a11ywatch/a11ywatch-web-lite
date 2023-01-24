import { exampleBase64 } from '@app/lib/mocks/example-base64'

export const websiteParamDefs = {
  url: {
    type: 'string',
    desc: 'The website url.',
    optional: false,
  },
  customHeaders: {
    type: 'string[{key: string, value: string}]',
    desc: 'An array of objects with key:value par for header configurations.',
    optional: true,
  },
  mobile: {
    type: 'boolean',
    desc: 'Is the testing done in mobile viewport?',
    optional: true,
  },
  standard: {
    type: 'string',
    desc: 'The WCAG2.1 standard to use ex: WCAG2A, WCAG2AA, and WCAG2AAA.',
    optional: true,
  },
}

const authParams = {
  email: {
    type: 'string',
    desc: 'The email account to login with.',
    optional: false,
  },
  password: {
    type: 'string',
    desc: 'The password to the email to login with.',
    optional: false,
  },
}

const crawlParams = {
  url: {
    type: 'string',
    desc: 'The url to crawl and gather reports.',
    optional: false,
  },
  subdomains: {
    type: 'boolean',
    desc: 'Include subdomains that match domain.',
    optional: true,
  },
  sitemap: {
    type: 'boolean',
    desc: 'Extend crawl with sitemap links.',
    optional: true,
  },
  tld: {
    type: 'boolean',
    desc: 'Include all TLD extensions that match domain.',
    optional: true,
  },
  pageInsights: {
    type: 'boolean',
    desc: 'Run with additional google lighthouse report. [Not required if configured]',
    optional: true,
  },
}

export const apiRoutes = [
  {
    title: 'Authentication & User',
    id: 'authentication&user',
    routes: [
      {
        pathName: 'user',
        method: 'GET',
        params: null,
        encodedParams: '',
        info: 'Retreive your user information details.',
        title: 'User',
      },
      {
        pathName: 'login',
        method: 'POST',
        params: authParams,
        info: 'Login to an existing account and retrieves an authentication token.',
        title: 'Login',
        encodedParams: `-d '{ "email": "example@email.com", "password": "dwdwd" }'`,
      },
      {
        pathName: 'register',
        method: 'POST',
        params: authParams,
        info: 'Create a new account to use and retrieves an authentication token.',
        title: 'Register',
        encodedParams: `-d '{ "email": "example@email.com", "password": "dwdwd" }'`,
      },
    ],
  },
  {
    title: 'Report Actions',
    id: 'report_actions',
    routes: [
      {
        pathName: 'scan',
        method: 'POST',
        params: {
          url: crawlParams.url,
          pageInsights: crawlParams.pageInsights,
        },
        info: 'Scan a single page for issues.',
        title: 'Scan',
        encodedParams: `-d '{ "url": "https://a11ywatch.com" }'`,
      },
      {
        pathName: 'crawl',
        method: 'POST',
        params: crawlParams,
        info: 'Multi page scan for issues.',
        title: 'Crawl',
        encodedParams: `-d '{ "url": "https://a11ywatch.com" }'`,
      },
      {
        pathName: 'websites-sync',
        method: 'POST',
        params: null,
        info: 'Account wide all websites multi page scan for issues.',
        title: 'Websites sync',
        encodedParams: ``,
      },
    ],
  },

  {
    title: 'Images',
    id: 'images',
    routes: [
      {
        pathName: 'image-check',
        method: 'POST',
        params: {
          imageBase64: {
            type: 'string',
            desc: 'A Base64 image to classify.',
            optional: false,
          },
        },
        encodedParams: `-d '{ "imageBase64": "${exampleBase64}" }'`,
        info: 'Describe an image.',
        title: 'Image Classify',
      },
    ],
  },
  {
    title: 'Website Management',
    id: 'website_management',
    routes: [
      {
        pathName: 'website',
        method: 'POST',
        params: websiteParamDefs,
        encodedParams: `-d '{ "websiteUrl": "https://a11ywatch.com" }'`,
        info: 'Create a website to track and configure for crawling.',
        title: 'Add Website',
      },
      {
        pathName: 'website?domain=https://a11ywatch.com',
        method: 'GET',
        params: {
          url: websiteParamDefs.url,
        },
        encodedParams: '',
        info: 'Retreive a web page information details.',
        title: 'Website',
      },
      {
        pathName: 'website',
        method: 'PUT',
        params: websiteParamDefs,
        encodedParams: `-d '{ "url": "https://a11ywatch.com" }'`,
        info: 'Update a website configuration.',
        title: 'Update Website',
      },
      {
        pathName: 'website',
        method: 'DELETE',
        params: {
          url: {
            ...websiteParamDefs.url,
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain name of the website.',
            optional: true,
          },
          deleteMany: {
            type: 'boolean',
            desc: 'Delete all websites and related data.',
            optional: true,
          },
        },
        encodedParams: `-d '{ "domain": "a11ywatch.com" }'`,
        info: 'Delete a website and all related data.',
        title: 'Delete Website',
      },
      {
        pathName: 'report?url=https://a11ywatch.com',
        method: 'GET',
        params: {
          url: {
            ...websiteParamDefs.url,
            optional: true,
          },
          download: {
            type: 'boolean',
            desc: 'Download the report to excel.',
            optional: true,
          },
        },
        encodedParams: '',
        info: 'Get the last report ran for a web page url.',
        title: 'Report',
      },
      {
        pathName: 'analytics?url=https://a11ywatch.com',
        method: 'GET',
        params: '',
        encodedParams: '',
        info: 'Retreive analytics for a web page.',
        title: 'Analytics',
      },
    ],
  },
  {
    title: 'Iframe Website',
    id: 'iframe_website',
    routes: [
      {
        pathName: 'iframe?url=https://a11ywatch.com',
        method: 'GET',
        params: '',
        encodedParams: '',
        info: 'Reverse engineer a website to iframe.',
        title: 'Iframe',
      },
    ],
  },
  {
    title: 'List Results',
    id: 'list_results',
    routes: [
      {
        pathName: 'list/website?offset=0',
        method: 'GET',
        params: '',
        encodedParams: '',
        info: 'Retreive a list of websites paginated.',
        title: 'List Websites',
      },
      {
        pathName: 'list/issue?offset=0&domain=a11ywatch.com',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set.',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get issues for.',
            optional: true,
          },
        },
        encodedParams: '',
        info: 'Retreive a list of issues paginated.',
        title: 'List Issues',
      },
      {
        pathName: 'list/pages?offset=0',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set.',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get pages for',
            optional: true,
          },
        },
        encodedParams: '',
        info: 'Retreive a list of pages paginated.',
        title: 'List Pages',
      },
      {
        pathName: 'list/analytics?offset=0&domain=a11ywatch.com',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set.',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get analytics for.',
            optional: true,
          },
          pageUrl: {
            type: 'string',
            desc: 'The exact page url to get analytics for.',
            optional: true,
          },
        },
        encodedParams: '',
        info: 'Retreive a list of analytics paginated.',
        title: 'List Analytics',
      },

      {
        pathName: 'list/pagespeed?offset=0&domain=a11ywatch.com',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set.',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get analytics for.',
            optional: true,
          },
          pageUrl: {
            type: 'string',
            desc: 'The exact page url to get analytics for.',
            optional: true,
          },
        },
        encodedParams: '',
        info: 'Retreive a list of pagespeed results paginated.',
        title: 'List PageSpeed',
      },
    ],
  },
]
