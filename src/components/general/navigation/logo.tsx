import { FC } from 'react'

interface Logo {
  width?: number
  height?: number
  id?: string
  className?: string
}

export const Logo: FC<Logo> = ({ width, height, className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '44'}
      height={height || '44'}
      className={className}
      fill='none'
      viewBox='0 0 32 32'
    >
      <rect width='32' height='32' className='' />
      <ellipse
        cx='15.868'
        cy='16'
        className='fill-black dark:fill-white'
        rx='13.223'
        ry='13.115'
      />
      <rect
        width='8.264'
        height='8.197'
        x='16.694'
        y='19.279'
        className='fill-white dark:fill-black'
      />
    </svg>
  )
}
