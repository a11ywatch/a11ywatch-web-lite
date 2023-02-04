import React from 'react'

export const SkipContent = () => {
  return (
    <a
      className={
        '-top-10 left-[18%] px-4 py-2 rounded hidden absolute font-medium md:block focus:top-2.5 focus:bg-white focus:ring focus:z-10 dark:text-black'
      }
      href={'#main-content'}
    >
      Skip navigation
    </a>
  )
}
