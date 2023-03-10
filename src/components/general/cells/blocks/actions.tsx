import React from 'react'
import { InfoBlock } from '../info-block'
import { GrAction } from 'react-icons/gr'

export const ActionsBox = ({ actions }: { actions?: any }) => {
  return (
    <InfoBlock title={'Actions'} icon={<GrAction className='grIcon' />}>
      {!!actions ? 'Enabled' : 'N/A'}
    </InfoBlock>
  )
}
