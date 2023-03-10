import { classNames } from '@app/utils/classes'
import { FC, PropsWithChildren } from 'react'

type SectionContainerProps = PropsWithChildren<{
  className?: string
  id?: string
  gapY?: boolean
  gapX?: boolean
  container?: boolean
  block?: boolean
}>

const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className,
  gapY = true,
  gapX = true,
  container,
  block,
  ...props
}) => {
  return (
    <section className={classNames(gapY ? 'pt-14 md:pt-20' : '')} {...props}>
      <div className={classNames(className, gapX ? 'px-4' : '')}>
        {container ? (
          <div className={`block md:flex place-items-center pb-0 gap-x-20`}>
            {block ? <div className={'flex-1 pb-4'}>{children}</div> : children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  )
}

export { SectionContainer }
