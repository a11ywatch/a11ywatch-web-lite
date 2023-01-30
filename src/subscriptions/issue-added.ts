import gql from 'graphql-tag'

export const ISSUE_SUBSCRIPTION = gql`
  subscription issueAdded {
    issueAdded {
      domain
      url
      issuesInfo {
        accessScore
        totalIssues
        errorCount
        warningCount
        noticeCount
      }
      pageLoadTime {
        duration
        durationFormated
      }
      issue {
        code
        type
        selector
        message
        context
        recurrence
      }
    }
  }
`
