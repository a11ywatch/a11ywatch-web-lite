import { Fragment } from 'react'
import { strings } from '@app-strings'
import { NavBarTitle, MarketingNavMenu } from '../navigation'
import { SearchBar } from '../searchbar'
import { NavBar } from '../navigation/navbar'
import { Footer } from '../footer'
import { MarketingAlternatives } from '@app/components/stateless/marketing/alternative'

// main marketing pages drawer
export function MarketingDrawer({
  children,
  initClosed,
  renderCtaSearch,
  title,
  navPosition,
  footerSpacing,
  emptyFooter,
  emptyNav,
  authenticated,
  loading,
}: any) {
  return (
    <Fragment>
      {emptyNav ? null : (
        <NavBar
          position={navPosition}
          marketing
          authenticated={authenticated}
          loading={loading}
          marketingLinks={
            <>
              <MarketingNavMenu home={`/${String(title).toLowerCase()}`} />
            </>
          }
        >
          <div className={'flex flex-1 align-center'}>
            <NavBarTitle title={strings.appName} href='/' marketing />
            {renderCtaSearch ? (
              <div className={'flex flex-1 justify-end place-items-center'}>
                <SearchBar placeholder={'Enter website url...'} noWidth cta />
              </div>
            ) : null}
          </div>
        </NavBar>
      )}
      <main
        className={`pb-10 ${initClosed ? '' : 'pt-1 overflow-hidden'}${
          footerSpacing ? ' pb-[20vh]' : ''
        }`}
        id='main-content'
      >
        {initClosed ? (
          children
        ) : (
          <div className={`container mx-auto`}>{children}</div>
        )}
      </main>
      {initClosed || emptyFooter ? null : (
        <>
          <MarketingAlternatives />
          <Footer />
        </>
      )}
    </Fragment>
  )
}
