import { SyntheticEvent, useCallback } from 'react'
import { PageTitle, AuthMenu } from '@app/components/general'
import { useFeaturesData, useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import { useWebsiteContext } from '@app/components/providers/website'
import { Header2 } from '@app/components/general/header'
import { AppManager, UserManager } from '@app/managers'
import { useAuthContext } from '@app/components/providers/auth'
import { NotificationSettings } from '@app/components/settings/notifications'
import { HistoryView } from '@app/components/settings/history-view'
import { CoreVitalsView } from '@app/components/settings/core-vitals-view'
import { RemoveDataView } from '@app/components/settings/remove-data-view'
import { LighthouseView } from '@app/components/settings/lighthouse-view'
import { ActionsViewView } from '@app/components/settings/actions-view'

import { useInteractiveContext } from '@app/components/providers/interactive'
import { ThemesView } from '@app/components/settings/themes-view'
import { LazyMount } from '@app/components/lazy/lazymount'
import { ApiView } from '@app/components/settings/api-view'
import { fetcher } from '@app/utils/fetcher'

function Settings() {
  const {
    settings: data, // user
    loading,
    onConfirmLighthouse,
    filterEmailDatesData: filterEmailDates,
    onFilterEmailDates,
  } = useUserData(true, 'settings')

  const { toggleAlert } = useFeaturesData()
  const { account, setAccountType } = useAuthContext()
  const { removeWebsite, setLighthouseVisibility, lighthouseVisible } =
    useWebsiteContext()
  const { setSelectedWebsite } = useInteractiveContext()
  const { alertEnabled, activeSubscription } = account

  const user = data?.user

  const filterEmailDatesData = filterEmailDates ?? user?.emailFilteredDates

  const onRemoveAllWebsitePress = useCallback(async () => {
    if (window.confirm('Are you sure you want to remove all websites?')) {
      try {
        await removeWebsite({
          variables: {
            url: '',
            deleteMany: true,
          },
        })
        setSelectedWebsite('')
      } catch (e) {
        console.error(e)
      }
    }
  }, [removeWebsite, setSelectedWebsite])

  const onDeleteAccountPress = useCallback(async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account and all data?'
      )
    ) {
      try {
        await fetcher('/user', null, 'DELETE')
        window.location.href = '/'
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const onLighthouseToggle = useCallback(() => {
    setLighthouseVisibility((visible: boolean) => {
      AppManager.toggleSnack(
        true,
        `Lighthouse display ${!visible ? 'hidden' : 'visible'}`
      )
      return !visible
    })
  }, [setLighthouseVisibility])

  const onAlertToggle = async (e?: SyntheticEvent<HTMLInputElement>) => {
    if (e && typeof e.stopPropagation === 'function') {
      e?.stopPropagation()
    }

    try {
      const nextValue = !alertEnabled
      setAccountType({
        authed: account.authed,
        activeSubscription,
        alertEnabled: nextValue,
        inited: true,
      })
      // todo: remove local storage usage for network + memory
      UserManager.setAlertsEnabled(nextValue)
      await toggleAlert({
        variables: {
          alertEnabled: nextValue,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (!data && !loading) {
    return (
      <div className='px-2'>
        <PageTitle
          title={'Settings'}
          rightButton={<AuthMenu authenticated={account.authed} settings />}
        />
        <div className='p-4 text-2xl'>
          Authentication required for Settings. Please login to continue.
        </div>
      </div>
    )
  }

  return (
    <main className='px-4 py-2 mx-auto container' id="main-content">
      <PageTitle
        title={'Settings'}
        rightButton={<AuthMenu authenticated={account.authed} settings />}
      />
      <Header2 className='sr-only'>
        Configuration to maximize the output for you
      </Header2>
      <div className='flex flex-col gap-y-4'>
        <NotificationSettings
          alertEnabled={alertEnabled}
          onAlertToggle={onAlertToggle}
          filterEmailDatesData={filterEmailDatesData}
          onFilterEmailDates={onFilterEmailDates}
          defaultDayTime={data?.user?.emailMorningOnly}
        />
        <LighthouseView
          lighthouseVisible={lighthouseVisible}
          onLighthouseToggle={onLighthouseToggle}
        />
        <CoreVitalsView
          onConfirmLighthouse={onConfirmLighthouse}
          user={data?.user}
        />
        <ActionsViewView user={data?.user} />
        <LazyMount>
          <ThemesView />
        </LazyMount>
        <ApiView user={user} />
        <LazyMount>
          <HistoryView />
        </LazyMount>
        <RemoveDataView
          onRemoveAllWebsitePress={onRemoveAllWebsitePress}
          onDeleteAccountPress={onDeleteAccountPress}
        />
      </div>
    </main>
  )
}

export default metaSetter(
  { Settings },
  {
    gql: true,
    description:
      'Settings that you can configure to build custom workflows and enhance your report insight.',
  }
)
