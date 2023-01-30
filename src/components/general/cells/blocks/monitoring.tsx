import React, { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { useWebsiteContext } from '@app/components/providers/website'

export const MonitoringEnabledWrapper = ({
  enabled,
  url,
}: {
  enabled?: boolean
  url?: string
}) => {
  const [monitoringEnabled, setMonitoring] = useState<boolean>(!!enabled)
  const { updateWebsite } = useWebsiteContext()

  const onMonitoringEvent = async () => {
    let nextValue = !monitoringEnabled

    setMonitoring(nextValue)

    try {
      await updateWebsite({
        variables: { url, monitoringEnabled: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-MonitoringEnabled-form`

  return (
    <InfoBlock>
      <div className='flex space-x-1 place-items-center'>
        <label className='text-sm font-medium' htmlFor={labelId}>
          Monitoring
        </label>
        <input
          checked={monitoringEnabled}
          type='checkbox'
          id={labelId}
          onChange={onMonitoringEvent}
          name={'mobile_viewport'}
          className={
            'outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
        ></input>
      </div>
      <div>{monitoringEnabled ? 'Enabled' : 'Disabled'}</div>
    </InfoBlock>
  )
}

export const MonitoringEnabledBox = memo(MonitoringEnabledWrapper)
