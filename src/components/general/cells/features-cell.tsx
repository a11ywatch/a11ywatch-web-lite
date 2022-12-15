import { memo } from 'react'
import {
  GrNotification as NotificationsIcon,
  GrCode as CodeIcon,
  GrAnalytics as DataUsageIcon,
  GrBug as BugReportIcon,
  GrHistory as HistoryIcon,
  GrApps as DashboardIcon,
  GrCatalog as PageIcon,
  GrAction as ActionIcon,
} from 'react-icons/gr'

import { Link } from '../link'
import { Pulse } from '../loaders'
import { SwitchInput } from '../switch'

const renderIcon = (feature?: string, className?: string) => {
  switch (feature) {
    case 'Alerts':
      return <NotificationsIcon className={className} />
    case 'Scripts':
      return <CodeIcon className={className} />
    case 'Analytics':
      return <DataUsageIcon className={className} />
    case 'Issues':
      return <BugReportIcon className={className} />
    case 'Pages':
      return <PageIcon className={className} />
    case 'Dashboard':
      return <DashboardIcon className={className} />
    case 'Actions':
      return <ActionIcon className={className} />
    case 'History':
      return <HistoryIcon className={className} />
    default: {
      return <div className={className} />
    }
  }
}

const extraProps = (feature?: string, focused?: boolean, setEvents?: any) => {
  switch (feature) {
    case 'Alerts':
      return {
        href: focused ? '/dashboard' : '/alerts',
        color: 'inherit',
      }
    case 'Scripts':
      return {
        href: focused ? '/dashboard' : '/scripts',
        onClick: setEvents ? () => setEvents({ firstAdd: 'set' }) : undefined,
        color: 'inherit',
      }
    case 'Issues':
      return {
        href: focused ? '/dashboard' : '/web-issues',
        color: 'inherit',
      }
    case 'Pages':
      return {
        href: focused ? '/dashboard' : '/web-pages',
        color: 'inherit',
      }
    case 'Analytics':
      return {
        href: focused ? '/dashboard' : '/website-analytics',
        color: 'inherit',
      }
    case 'Dashboard':
      return {
        href: '/',
        color: 'inherit',
      }
    case 'Actions':
      return {
        href: focused ? '/dashboard' : '/web-actions',
        color: 'inherit',
      }
    case 'History':
      return {
        href: focused ? '/dashboard' : '/history',
        color: 'inherit',
      }
    default: {
      return null
    }
  }
}

function renderGuide(index: number, events: any) {
  if (index === 1 && events?.firstAdd === true) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        <Pulse visible size={20} />
      </div>
    )
  }

  return null
}

const listTitleStyle =
  'sr-only text-gray-600 sm:text-xs sm:not-sr-only md:text-sm'

export function FeaturesCellComponent({
  feature,
  alertEnabled = false,
  index,
  toggleAlert,
  focused,
  events,
  setEvents,
}: any) {
  const title = focused ? 'Dashboard' : feature

  return (
    <li>
      <Link
        className={`flex text-gray-600 place-items-center gap-x-3 py-3 pl-2 pr-2 place-content-around min-h-[44px] hover:bg-gray-100 hover:no-underline md:py-2 md:pl-5 md:pr-2 md:min-h-[54px]`}
        {...extraProps(feature, focused, setEvents)}
      >
        <div className='flex flex-1 text-xs md:text-sm place-items-center gap-x-2 place-content-center md:place-content-start sm:gap-x-3 md:gap-x-4'>
          {renderIcon(
            title,
            (index === 0 &&
              alertEnabled &&
              'grIcon text-blue-700 md:text-gray-700') ||
              'grIcon text-gray-700'
          )}
          {index === 0 ? (
            <label className={listTitleStyle} htmlFor='alerts-btn'>
              {title}
            </label>
          ) : (
            <div className={listTitleStyle}>{title}</div>
          )}
        </div>
        {index === 0 ? (
          <div className='hidden lg:block'>
            <SwitchInput
              id='alerts-btn'
              checked={alertEnabled}
              onChange={toggleAlert}
            />
          </div>
        ) : null}
        {renderGuide(index, events)}
      </Link>
    </li>
  )
}

export const FeaturesCell = memo(FeaturesCellComponent)
