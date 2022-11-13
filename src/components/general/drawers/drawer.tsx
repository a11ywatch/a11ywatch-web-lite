import { Fragment } from 'react'
import { useUserData } from '@app/data'
import { UpgradeBanner } from '@app/components/general/upgrade-banner'
import { drawerStyles } from '@app/styles/drawer'
import { NavBarTitle, AuthedMenu } from '../navigation'
import { NavBar } from '../navigation/navbar'
import { FixedCopyRight } from '../fixed-copy-right'
import { ConfirmEmail } from '../../alerts'
import { useWebsiteContext } from '../../providers/website'
import { IssueFeed } from '../../feed'
import { FormDialog } from '../form-dialog'
import { useAuthContext } from '@app/components/providers/auth'
import { SearchBar } from '../searchbar'
import { DynamicModal } from '../../modal/dynamic'
import { MiniPlayer } from '../mini-player'

function MainDrawerContainer({ route, dataSourceMap, classes }: any) {
  return (
    <div
      className={`${classes.drawer} ${classes.drawerPaper} relative print:hidden overflow-hidden`}
    >
      <div className='fixed flex flex-col w-[inherit] overflow-hidden h-full bg-gray-100'>
        <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
        <div
          className={
            'xl:visible invisible p-4 place-items-center flex-col flex'
          }
        >
          <FormDialog buttonStyles={'w-full'} />
        </div>
        <UpgradeBanner />
        <FixedCopyRight sticky />
      </div>
    </div>
  )
}

export function DrawerWrapper({
  route: routePath,
  title = '',
  classes,
  dataSourceMap,
  sidePannelStyles,
  authenticated,
}: any) {
  return (
    <Fragment>
      <NavBar
        authenticated={authenticated}
        title={title}
        position='fixed'
        className={`${classes.nav} ${sidePannelStyles}`}
      >
        <span className={classes.drawerIconContainer}>
          <NavBarTitle title={title} flex />
          <SearchBar />
        </span>
      </NavBar>
      <MainDrawerContainer
        route={routePath ?? title}
        dataSourceMap={dataSourceMap}
        classes={classes}
      />
    </Fragment>
  )
}

export function Drawer({
  children,
  route,
  title,
  initClosed,
  bottomButton,
}: any) {
  const classes = drawerStyles()
  const { data: dataSourceMap, sendConfirmEmail } = useUserData()
  const { issueFeed } = useWebsiteContext()
  const { authed } = useAuthContext()

  const { open } = issueFeed

  const user = dataSourceMap?.user as any
  const sidePannelStyles = open ? classes.sidePanelPadding : ''

  return (
    <div className={classes.root}>
      <DrawerWrapper
        initClosed={initClosed}
        classes={classes}
        route={route}
        title={title}
        bottomButton={bottomButton}
        authenticated={authed}
        dataSourceMap={dataSourceMap}
        sidePannelStyles={sidePannelStyles}
      />
      <main className={classes.content} id='main-content'>
        <div className={sidePannelStyles}>
          <div className={'pr-2 md:pr-4 md:pl-8 lg:pl-8 lg:pr-8'}>
            {children}
          </div>
        </div>
        <ConfirmEmail
          sendEmail={sendConfirmEmail}
          visible={user?.loggedIn && !user?.emailConfirmed}
        />
        <IssueFeed />
        <MiniPlayer />
        <DynamicModal />
      </main>
    </div>
  )
}
