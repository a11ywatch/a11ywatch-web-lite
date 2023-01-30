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
        possibleIssuesFixedByCdn
        issuesFixedByCdn
        issueMeta {
          skipContentIncluded
        }
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
