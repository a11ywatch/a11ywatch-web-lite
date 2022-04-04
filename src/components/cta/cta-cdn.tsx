import React, { Fragment } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { LinkPrefetch } from '@app/components/general/link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tryOut: {
      marginLeft: '3px',
      marginRight: '5px',
    },
    row: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
    },
    register: {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
    report: {
      color: theme.palette.primary.main,
    },
    text: {
      fontWeight: 'bold',
      marginRight: '12px',
    },
    limited: {
      padding: theme.spacing(1),
      borderRadius: '3px',
      border: `2px solid ${theme.palette.primary.main}`,
      marginTop: theme.spacing(1),
    },
  })
)

function CtaCdn({ website, disablePlayground }: any) {
  const classes = useStyles()
  const noIssues =
    Number(website?.issues?.length || website?.issues?.issues?.length) === 0
  const possibleIssuesFixedByCdn =
    website?.issuesInfo?.possibleIssuesFixedByCdn ?? '_'
  const totalIssuesOnPage = website?.issuesInfo?.totalIssues ?? '_'
  const shouldBlock = disablePlayground
  const limitedResonse = website?.issuesInfo?.limitedCount
    ? `This is a limited API response showing ${website.issuesInfo.limitedCount}/${totalIssuesOnPage} issues for the current page`
    : !website?.issues && 'Gathering details'
  const cdnTitle = shouldBlock
    ? `Login to fix ${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues instantly with a custom secure cdn free`
    : `Fix ${possibleIssuesFixedByCdn} out of ${totalIssuesOnPage} issues instantly ${strings.tryOutCdn} `
  const moreInfo = shouldBlock
    ? `Get all your pages issues at once and more after signing in`
    : ''

  return (
    <Fragment>
      <span className={classes.row} style={{ marginTop: 12 }}>
        <Typography
          component='span'
          className={classes.tryOut}
          variant={'subtitle1'}
        >
          {cdnTitle}
        </Typography>
      </span>
      {moreInfo ? (
        <Typography
          component='span'
          className={classes.tryOut}
          variant={'subtitle2'}
        >
          {moreInfo}
        </Typography>
      ) : null}
      {limitedResonse ? (
        <div className={classes.limited}>
          <Typography variant={'subtitle2'}>{limitedResonse}</Typography>
        </div>
      ) : null}
      {disablePlayground ? null : (
        <span className={classes.row} style={{ marginTop: 12 }}>
          <Button
            component={LinkPrefetch}
            href={'/login'}
            color={'secondary'}
            variant={'contained'}
            className={classes.text}
          >
            Login
          </Button>
          <Button
            component={LinkPrefetch}
            href={'/register'}
            color={'secondary'}
            variant={'outlined'}
            className={`${classes.register} ${classes.text}`}
          >
            Register
          </Button>
        </span>
      )}
      {noIssues ? <Typography>No issues found, great job!</Typography> : null}
    </Fragment>
  )
}

export { CtaCdn }
