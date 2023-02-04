import { FC } from 'react'
import { strings } from '@app-strings'
import { Link } from '../general/link'
import { Logo } from '../general'
import { DOMAIN_NAME, dev } from '@app/configs'

let BLOG_HREF = DOMAIN_NAME.replace('.com', '.blog')
let MAIN_HREF = DOMAIN_NAME

if (dev) {
  BLOG_HREF = '/blog'
  MAIN_HREF = '/'
}

export const NavBar: FC<any> = ({ title = strings.appName }) => {
  return (
    <header>
      <nav className='bg-[#0E1116] z-10 px-2 py-1 md:py-3 md:px-4'>
        <div
          className='flex content-center place-items-center text-white space-x-2 font-semibold'
          style={{ display: 'flex' }}
        >
          <Link href={MAIN_HREF}>
            <span className='sr-only'>A11yWatch Logo</span>
            <Logo
              className='block invert dark:invert-0 p-0 m-0'
              width={24}
              height={24}
            />
          </Link>
          <span>/</span>
          <Link
            className={`text-normal text-white md:text-base`}
            href={BLOG_HREF}
          >
            {title}
          </Link>
        </div>
      </nav>
    </header>
  )
}
