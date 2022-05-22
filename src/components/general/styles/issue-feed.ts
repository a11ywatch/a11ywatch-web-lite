import { makeStyles, createStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

export const useStyles = makeStyles(
  ({ breakpoints, color, palette }: MergedTheme) =>
    createStyles({
      root: {
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '20vw',
        minWidth: 260,
        overflowY: 'scroll',
        zIndex: 1002,
        backgroundColor: palette.common.white,
        [breakpoints.down(1280)]: {
          top: '50%',
          height: '50vh',
          width: '100vw',
          left: 0,
          position: 'fixed',
          overflowY: 'auto',
          borderTop: `1px solid ${palette.divider}`,
        },
      },
      title: {
        flex: 1,
      },
      list: {
        overflowX: 'hidden',
        paddingBottom: 0,
        paddingTop: 0,
        listStyleType: 'none',
      },
      searchList: {
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingBottom: 0,
        display: 'block',
        maxHeight: 'calc(100vh)',
        [breakpoints.down('sm')]: {
          maxHeight: '50vh',
        },
        paddingTop: 0,
      },
      checklist: {
        maxHeight: 'none',
        overflowY: 'hidden',
      },
      subTitle: {
        paddingLeft: 12,
        paddingRight: 10,
        borderBottom: `1px solid ${color?.border || '#ccc'}`,
      },
      row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      print: {
        minHeight: 'auto',
      },
    })
)
