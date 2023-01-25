import { useMemo } from 'react'
import {
  PageTitle,
  Drawer,
  PaymentPlans,
  Spacer,
  AuthMenu,
} from '@app/components/general'
import { List } from '@app/components/general/lists/websites-pages-actions'
import { useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { PageLoader } from '@app/components/placeholders'
import { useWebsiteContext } from '@app/components/providers/website'
import { LoadMoreButton } from '@app/components/general/buttons'
import { useAuthContext } from '@app/components/providers/auth'

function WebActionsPage() {
  const { actionsData, actionsDataLoading, refetch, error, onLoadMoreActions } =
    useWebsiteContext()
  const { search } = useSearchFilter()

  // search local filtering
  const source = useMemo(
    () => (Array.isArray(actionsData) ? filterSort(actionsData, search) : []),
    [actionsData, search]
  )

  return (
    <PageLoader
      empty={actionsData?.length === 0}
      loading={actionsDataLoading}
      hasWebsite={!!actionsData?.length}
      emptyTitle={'No Websites Added'}
      error={error}
    >
      <List
        data={source}
        loading={actionsDataLoading}
        refetch={refetch}
        emptyHeaderTitle='No Actions found'
        emptyHeaderSubTitle='Actions will appear here if you add them initially'
      >
        <li>
          <LoadMoreButton
            visible={source.length > 1}
            onLoadMoreEvent={onLoadMoreActions}
          />
        </li>
      </List>
    </PageLoader>
  )
}

// phase out page for components view
function WebActions({ name }: PageProps) {
  const { account } = useAuthContext()

  return (
    <Drawer>
      <PageTitle
        title={account.activeSubscription ? name : 'Upgrade Required'}
        rightButton={<AuthMenu authenticated={account.authed} settings />}
      />
      <Spacer height={'8px'} />
      {account.activeSubscription ? (
        <WebActionsPage />
      ) : (
        <PaymentPlans pricingPage />
      )}
    </Drawer>
  )
}

export default metaSetter(
  { WebActions },
  {
    description: 'Your web page actions to run during testing.',
    gql: true,
    wasm: true,
  }
)
