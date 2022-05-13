import { makeStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

export const formDialogStyles = makeStyles((theme: MergedTheme) => ({
  row: {
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1) - 4.2,
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
  dialogPadding: {
    paddingTop: `${theme.spacing(1)}px !important`,
  },
  input: {
    marginLeft: 2,
    flex: 1,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      minWidth: 60,
      marginLeft: 'auto',
    },
  },
  inputAdjust: {
    marginLeft: 4,
  },
  formLabel: {
    paddingLeft: 2,
    paddingRight: 2,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 6,
    },
  },
  formLabelText: {
    fontSize: '1.25rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },
  inputSelect: {
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      paddingRight: 2,
    },
    maxHeight: '50vh',
  },
  textInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  formControl: {
    marginLeft: 4,
    marginRight: 10,
    width: 'auto',
    minWidth: 70,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      minWidth: 60,
    },
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme?.spacing(3),
  },
  topTitle: {
    flex: 1,
    ['& > h2']: {
      fontWeight: 600,
    },
  },
}))
