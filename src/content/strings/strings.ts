export const generateStrings = ({
  appName,
  headers,
  meta,
}: {
  appName: string
  headers?: any
  meta: { title?: string; description?: string }
}) => {
  return {
    appName,
    headers,
    meta,
    title: 'Web Accessibility',
    monitoring: 'Monitoring',
    consulting: 'Consultants',
    fixer: 'Remedy',
    helper: 'Helper',
    watcher: 'Insight',
    ai: 'Monitor',
    productivity: 'Productivity',
    ctaDetails: 'Everything you need to improve your websites accessibility',
    ctaInfo:
      'Improve your accessibility with our monitor, helper and fixer powered by AI.',
    ctaTryOut: 'Try A11yWatch for free',
    ctaSeeHowItWorks: 'See How It Works',
    customers: 'Get reports, monitoring, and core web vitals',
    usersUsing: 'Used on here',
    customersWhy:
      'Get live results on any website like Twitter, Github, and Dropbox.',
    features: [
      {
        id: 0,
        title: 'On-Demand',
        detail:
          'Target accessibility issues spot on helping to figure out problems at hand. View detailed reports and vitals across your websites.',
      },
      {
        id: 1,
        title: 'Alerts',
        detail:
          'Get notified when issues occur so you can take action immediately and control when you want to get alerted.',
      },
      {
        id: 2,
        title: 'Recommendations',
        detail:
          'Get tips on how to improve your app so all users have a pleasant experience. Inject code fixes automatically into your source.',
      },
      {
        id: 3,
        title: 'Integrations',
        detail:
          'Integrations for any situation with direct access to the same engine across any platform or 3rd party tool.',
        icon: 'accessibility',
      },
      {
        id: 4,
        title: 'API',
        detail:
          'Connect your software to handle issues via our API. Choose between OpenAPI, GraphQL, and gRPC to communicate.',
      },
      {
        id: 5,
        title: 'Live Viewer',
        detail:
          'View the issues in the browser and experiment with fixes in real time. Adjust colors and accessibility properties for productivity.',
      },
      {
        id: 6,
        title: 'AI',
        detail:
          'With AI and machine learning we tailor custom needs rapidly. Determine missing alts with high proximity ratios, css style issues, and more.',
      },
      {
        id: 7,
        title: '100% Open-Source',
        detail:
          'Every line of code to power this project is fully open-source and available on GitHub. Easily fork the project and run on any server with bare metal or docker.',
      },
      {
        id: 8,
        title: 'Speed',
        detail:
          'Reports run so fast that we can handle 10,000 - 100,000 pages within 1-5 mins on 8gb mem linux. The speed of the reports at this rate becomes a feature when you compare with others.',
      },
    ],
    alerts: {
      enableNotificationsTitle: 'Would you like to enable notifications?',
      enableNotificationsDetail: `Enabling notifications can help you get alerted instantly as new issues occur.
	Save time by doing the things you care about and allow us to notify you when critical errors arise. 
	You can always disable and enable this in your browser settings.`,
      notNow: 'Not Now',
      yes: 'Yes',
      okay: 'Okay',
    },
    onboarding: {
      limitEmailsTitle:
        'Did you know you can limit the amount of emails you get from us?',
      limitEmailsDetail:
        'You can modify which days of the week you receive emails by going to alerts page and making the appropriate selections.',
    },
    getSupport: 'Get Professional Support',
    trySearch: 'Free website accessibility scan',
    tryOutCdn: 'after sign in.',
    subTitle: 'Elevating accessibility for every website',
  }
}
