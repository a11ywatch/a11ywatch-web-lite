import { memo } from 'react'
import { Link } from '../general'

const IssueTitleComponent = ({ pageUrl }: { pageUrl: string }) => {
  const url = pageUrl ? new URL(pageUrl) : { pathname: pageUrl, search: '' }

  const { pathname, search } = url

  return (
    <Link
      title={`view in sandbox ${pageUrl}`}
      href={`/website-details?url=${encodeURIComponent(pageUrl)}`}
      className={'text-lg hover:text-blue-800'}
    >
      {`${pathname}${search}`}
    </Link>
  )
}

export const IssueTitle = memo(IssueTitleComponent)
