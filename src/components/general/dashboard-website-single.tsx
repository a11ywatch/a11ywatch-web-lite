import { FC, useEffect, useMemo } from 'react'
import { useWebsite } from '@app/data'
import type { Website } from '@app/types'
import { _ONBOARDED } from '@app/lib/cookies/names'
import { WebsiteList } from '@app/components/general/website-list'
import { useWebsiteContext } from '@app/components/providers/website'
import { companyName } from '@app/configs'
import { useInteractiveContext } from '@app/components/providers/interactive'
import Head from 'next/head'
import { HomeManager } from '@app/managers'

type DashboardWebsiteListProps = {
  sortModalVisible?: boolean
  queryModalVisible?: boolean
  url: string
  refetchWebsites(_?: any): Promise<any>
}

// display type
const webPageStyle = ({
  sortModalVisible,
  queryModalVisible,
}: {
  sortModalVisible?: boolean
  queryModalVisible?: boolean
}) => {
  if (sortModalVisible || queryModalVisible) {
    return 'hidden'
  }
  return 'visible py-2'
}

export const DashboardWebsiteSingle: FC<DashboardWebsiteListProps> = ({
  sortModalVisible,
  queryModalVisible,
  url,
  refetchWebsites,
}) => {
  const { setModal, setSelectedWebsite } = useInteractiveContext()

  const {
    mutatationLoading,
    removeWebsite,
    refetch,
    crawlWebsite,
    lighthouseVisible,
    activeCrawls,
  } = useWebsiteContext()

  const { data, loading, error } = useWebsite(url)

  useEffect(() => {
    const clearData = error || (!data?.website && !loading)
    // return to dashboard all display
    if (clearData) {
      HomeManager.setDashboardView('')
      setSelectedWebsite('')
    }
  }, [data, loading, error, setSelectedWebsite])

  const websites: Website[] = useMemo(() => {
    if (data?.website) {
      return [data.website]
    }
    return []
  }, [data])

  const onRemoveWebsiteEvent = async (x: any) => {
    // refetch the base list
    try {
      await removeWebsite(x)
    } catch (e) {
      console.error(e)
    }
    try {
      await refetchWebsites()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {data?.pageInsights ? (
        <Head>
          <style>
            {`.lh-root .lh-topbar__url, .report-icon--download, .lh-topbar__logo, .report-icon--dark { display: none !important; } .lh-topbar { z-index: 1; }`}
          </style>
        </Head>
      ) : null}
      <div className={webPageStyle({ sortModalVisible, queryModalVisible })}>
        <WebsiteList
          data={websites}
          error={error}
          loading={loading}
          mutatationLoading={mutatationLoading}
          removePress={onRemoveWebsiteEvent}
          crawlWebsite={crawlWebsite}
          refetch={refetch}
          setModal={setModal}
          lighthouseVisible={lighthouseVisible}
          emptyHeaderTitle={`Welcome to ${companyName}`}
          emptyHeaderSubTitle={'Add a website to get started'}
          activeCrawls={activeCrawls}
        ></WebsiteList>
      </div>
    </>
  )
}
