import React, { FC, PropsWithChildren } from 'react'
import { classNames } from '@app/utils/classes'

const styles = {
  infoContainer:
    'px-4 py-2.5 flex flex-col flex-1 text-base justify-start space-y-0.5',
  infoBorder: '',
  p: 'text-base',
  row: 'flex place-items-center space-x-2',
}

type BaseProps = PropsWithChildren<{
  title?: string
  icon?: any
  className?: string
}>

export const InfoBlock: FC<BaseProps> = ({
  children,
  title,
  icon,
  className,
}) => {
  return (
    <div
      className={classNames(
        `${styles.infoContainer}${icon ? ` ${styles.infoBorder}` : ''}`,
        className
      )}
    >
      {title || icon ? (
        <div className={styles.row}>
          {icon}
          {title ? <p className={styles.p}>{title}</p> : null}
        </div>
      ) : null}
      <div className='text-sm'>{children}</div>
    </div>
  )
}
