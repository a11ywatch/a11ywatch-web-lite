import React from 'react'
import { Header3 } from '@app/components/general/header'
import { WeekSelect } from '@app/components/alerts'
import { SwitchInput } from '@app/components/general/switch'
import { FormControl } from '@app/components/general/form-control'

type NotificationSettingsProps = {
  filterEmailDatesData: number[]
  onAlertToggle(): void
  onFilterEmailDates(dates: number[], morning: boolean): Promise<void>
  alertEnabled?: boolean
  defaultDayTime?: boolean
}

// stateless notification settings
export const NotificationSettings = ({
  onAlertToggle,
  onFilterEmailDates,
  filterEmailDatesData,
  alertEnabled,
  defaultDayTime,
}: NotificationSettingsProps) => {
  return (
    <div className='py-2 gap-y-2 border-t'>
      <Header3 className='sr-only'>Notifications</Header3>
      <div className='flex gap-x-2 place-items-center'>
        <FormControl
          htmlFor='alerts-btn'
          visible
          className={
            'text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium py-2'
          }
        >
          Notifications
        </FormControl>
        <SwitchInput
          id='alerts-btn'
          checked={alertEnabled}
          onChange={onAlertToggle}
        />
      </div>
      <WeekSelect
        confirmDates={onFilterEmailDates}
        filterEmailDates={filterEmailDatesData}
        disabled={!alertEnabled}
        defaultDayTime={defaultDayTime}
      />
    </div>
  )
}
