import { FC } from 'react'

export const IntroGraph: FC = () => {
  return (
    <div className='py-6'>
      <div className='flex-col flex text-center border-4 border-[#2b2b2b] rounded'>
        <div className='py-2'>
          <h2 className='text-xl font-semibold'>Website Accessibility</h2>
          <p className='text-base'>The big picture</p>
        </div>
        <ul className='grid grid-cols-3 place-items-start pt-1 h-40 place-items-center'>
          <li className='flex flex-1 px-2 h-full'>
            <div className='flex flex-col h-full place-content-end'>
              <div className='py-1' aria-hidden='true'>
                <div className='text-base font-semibold'>1,038,145+</div>
              </div>
              <div className='px-2 bg-black dark:bg-white h-full w-20 rounded-t border-4 border-b-0 border-gray-700'>
                <div className='sr-only'>
                  A11yWatch: 1,038,145+ scans per minute
                </div>
              </div>
            </div>
          </li>
          <li className='flex flex-1 px-2 h-full'>
            <div className='flex flex-col h-full place-content-end'>
              <div className='py-1' aria-hidden='true'>
                <div className='text-base font-semibold'>63%</div>
              </div>
              <div className='px-2 bg-black dark:bg-white h-[60%] w-20 rounded-t border-4 border-b-0 border-gray-700'>
                <div className='sr-only'>63% coverage across issues</div>
              </div>
            </div>
          </li>
          <li className='flex flex-1 px-2 h-full'>
            <div className='flex flex-col h-full place-content-end'>
              <div className='py-1' aria-hidden='true'>
                <div className='text-base font-semibold'>100%</div>
              </div>
              <div className='px-2 bg-black dark:bg-white h-full w-20 rounded-t border-4 border-b-0 border-gray-700'>
                <div className='sr-only'>100% Open Source</div>
              </div>
            </div>
          </li>
        </ul>
        <div className='grid grid-cols-3 py-2 text-center px-1'>
          <div className='text-sm font-medium'>Audits per minute</div>
          <div className='text-sm font-medium'>Accessibility coverage</div>
          <div className='text-sm font-medium'>Percent open source</div>
        </div>
      </div>
    </div>
  )
}
