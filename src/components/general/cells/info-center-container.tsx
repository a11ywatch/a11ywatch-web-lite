import React, { FC } from 'react'

export const InfoCenterContainer: FC = ({ children }) => (
  <div className={'flex flex-col w-full place-items-center py-2 my-2'}>
    {children}
  </div>
)
