import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITES_LIST } from '@app/queries/websites'
import { FC, useMemo } from 'react'
import { Popover } from '@headlessui/react'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { HomeManager } from '@app/managers'

const cellClassName =
  'w-full text-left text-sm px-2 py-1.5 md:px-4 md:py-1.5 hover:opacity-70 hover:rounded-t'

const WebsiteCellItem = ({
  domain,
  onClick,
}: {
  domain: string
  onClick(): void
}) => {
  return (
    <li className='w-full'>
      <Popover.Button
        className='w-full rounded-none text-left text-sm px-2 py-1.5 md:px-4 md:py-1.5 hover:opacity-70'
        onClick={onClick}
      >
        {domain}
      </Popover.Button>
    </li>
  )
}

export const AllWebsitesList: FC = () => {
  const { data, loading, error } = useQuery(GET_WEBSITES_LIST, {
    variables: { limit: 100 },
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })
  const { setSelectedWebsite } = useInteractiveContext()

  const list = useMemo(() => data?.user?.websites || [], [data])

  const onClickEvent = (domain: string) => {
    HomeManager.setDashboardView(domain)
    setSelectedWebsite(domain)
  }

  const onViewAllEvent = () => {
    onClickEvent('')
  }

  return (
    <ul className='max-h-64 overflow-y-auto list-none bg-white dark:bg-black shadow rounded border scrollbar'>
      <li>
        <Popover.Button onClick={onViewAllEvent} className={cellClassName}>
          View all sites
        </Popover.Button>
      </li>
      {list?.length ? (
        list.map((item: { domain: string; url: string }) => (
          <WebsiteCellItem
            domain={item.domain}
            key={item.domain}
            onClick={() => onClickEvent(item.url)}
          />
        ))
      ) : loading || error ? (
        <li className={cellClassName}>
          {loading ? 'Loading Websites...' : 'An Issue occurred.'}
        </li>
      ) : null}
    </ul>
  )
}
