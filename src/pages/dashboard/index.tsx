import { useEffect, useRef, useState } from 'react'
import { LinearBottom } from '@app/components/general'
import { metaSetter } from '@app/utils'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { useWebsiteContext } from '@app/components/providers/website'
import { SortableWebsiteList } from '@app/components/general/website'
import { CtaInputRest } from '@app/components/cta/searchbar/cta-input-rest'
import { MarketingBottomTemporaryDrawer } from '@app/components/modal'
import { WCAGSelectInput } from '@app/components/general/select'
import { fetcher } from '@app/utils/fetcher'
import { AppManager } from '@app/managers'
import { useInteractiveContext } from '@app/components/providers/interactive'
import { RightBar } from '@app/components/general/dashboard-menu'
import { ModalType } from '@app/data/enums'
import { ViewConfigTitle } from '@app/components/general/view-config-title'
import { DashboardDrawer } from '@app/components/general/drawers/dashboard-drawer'
import { DashboardWebsiteList } from '@app/components/general/dashboard-website-list'
import { useAuthContext } from '@app/components/providers/auth'
import { DashboardWebsiteSingle } from '@app/components/general/dashboard-website-single'
import { StateLessViewConfigTitle } from '@app/components/stateless/titles/view-config-title'
import { CtaHtmlInputRest } from '../../components/cta/searchbar/cta-html-input-rest'

function Dashboard() {
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false)
  const [queryModalVisible, setQueryModalVisible] = useState<boolean>(false)
  const [standard, setStandard] = useState<string>('WCAG2AA')
  const { setModal, selectedWebsite } = useInteractiveContext()
  const { account } = useAuthContext()
  const { mutatationLoading, refetch, getWebsites } = useWebsiteContext()
  const initialQuery = useRef<boolean>(false)

  // lazy fire first query
  useEffect(() => {
    if (account.inited && !selectedWebsite && !initialQuery.current) {
      getWebsites()
      initialQuery.current = true
    }
  }, [getWebsites, account, selectedWebsite])

  const onWebsiteSort = () =>
    setSortModalVisible((v) => {
      if (queryModalVisible) {
        setQueryModalVisible(false)
      }
      return !v
    })

  const onQueryEvent = () =>
    setQueryModalVisible((v) => {
      if (sortModalVisible) {
        setSortModalVisible(false)
      }
      return !v
    })

  const onAnalyticsEvent = async () => {
    const res = await fetcher('/list/website?=limit=50', null, 'GET')

    setModal({
      open: true,
      url: '',
      modalType: ModalType.analytics,
      data: res?.data,
    })
  }

  const onStandardChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStandard(e.target.value)

  const onScanAllEvent = async () => {
    const { message, code } = await fetcher('/websites-sync', null, 'POST')

    AppManager.toggleSnack(
      true,
      message || 'Sync failed!',
      code === 200 ? 'message' : 'error'
    )
  }

  // conditional display
  let sortStyle = 'hidden'
  let queryStyle = 'hidden'

  if (sortModalVisible) {
    sortStyle = 'visible'
  }

  if (queryModalVisible) {
    queryStyle = 'visible'
  }

  return (
    <>
      <DashboardDrawer>
        <h1 className='sr-only'>Dashboard Panel</h1>
        {account.activeSubscription ? (
          <>
            <ViewConfigTitle title={'All sites'}>
              <RightBar
                premiumEnabled={account.activeSubscription}
                onQueryEvent={onQueryEvent}
                sortModalVisible={sortModalVisible}
                onWebsiteSort={onWebsiteSort}
                queryModalVisible={queryModalVisible}
                onScanAllEvent={onScanAllEvent}
                onAnalyticsEvent={onAnalyticsEvent}
              />
            </ViewConfigTitle>

            <div className={sortStyle}>
              <SortableWebsiteList refetch={refetch} />
            </div>
          </>
        ) : (
          <StateLessViewConfigTitle title={'All sites'}>
            <RightBar
              premiumEnabled={account.activeSubscription}
              onQueryEvent={onQueryEvent}
              sortModalVisible={sortModalVisible}
              onWebsiteSort={onWebsiteSort}
              queryModalVisible={queryModalVisible}
              onScanAllEvent={onScanAllEvent}
              onAnalyticsEvent={onAnalyticsEvent}
            />
          </StateLessViewConfigTitle>
        )}
        <div className={queryStyle}>
          <div className='py-4 h-full'>
            <div className='flex flex-col place-items-center place-content-center space-y-6'>
              <WCAGSelectInput
                onStandardChange={onStandardChange}
                standard={standard}
                spacing
                className='border rounded md:border'
              />
              <CtaInputRest standard={standard} />
              <p>Or HTML</p>
              <CtaHtmlInputRest standard={standard} />
            </div>
            <MarketingBottomTemporaryDrawer authenticated />
          </div>
        </div>

        {selectedWebsite ? (
          <DashboardWebsiteSingle
            queryModalVisible={queryModalVisible}
            sortModalVisible={sortModalVisible}
            url={selectedWebsite}
            refetchWebsites={refetch}
          />
        ) : (
          <DashboardWebsiteList
            queryModalVisible={queryModalVisible}
            sortModalVisible={sortModalVisible}
          />
        )}
      </DashboardDrawer>
      <LinearBottom loading={mutatationLoading} />
    </>
  )
}

export default metaSetter(
  { Dashboard },
  {
    gql: true,
    wasm: true,
    rest: true,
  }
)
