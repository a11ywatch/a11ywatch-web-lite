import { PropsWithChildren } from 'react'
import { classNames } from '@app/utils/classes'
import { GrStatusGoodSmall } from 'react-icons/gr'

type ViewConfigTitleProps = {
  title?: string
  className?: string
}

// determine layout for view one of all or selected website todo
function StateLessViewConfigTitle({
  title = '',
  children,
  className = '',
}: PropsWithChildren<ViewConfigTitleProps>) {
  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-between flex-wrap gap-y-1.5 pt-4 pb-2'
      )}
    >
      <div
        className={
          'w-full md:w-auto border rounded px-3 py-1.5 text-sm font-medium flex place-items-center place-content-between gap-x-3'
        }
      >
        <div className={'min-w-[80px] max-w-[180px] truncate text-left'}>
          {title}
        </div>
        <GrStatusGoodSmall className='grIcon text-[9px] text-gray-400' />
      </div>
      {children}
    </div>
  )
}

export { StateLessViewConfigTitle }
