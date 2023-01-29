use serde::{Deserialize, Serialize};
use crate::structures::{Issue, IssueInfo};

#[derive(Deserialize, Serialize, Debug, Default, Clone, Eq, Hash, PartialEq)]
pub struct LightHouse {
    pub json: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone, Eq, Hash, PartialEq)]
pub struct PageLoadTime {
    pub duration: i32,
    #[serde(rename = "durationFormated")]
    pub duration_formated: String
}

#[derive(Deserialize, Serialize, Debug, Default, Clone, Eq, Hash, PartialEq)]
/// general website structure
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "issuesInfo")]
    pub issues_info: IssueInfo,
    pub issues: Option<Vec<Issue>>,
    pub online: bool,
    #[serde(rename = "lastScanDate")]
    pub last_scan_date: String,
    pub insight: Option<LightHouse>,
    #[serde(rename = "pageInsights")]
    pub page_insights: bool,
    #[serde(rename = "pageLoadTime")]
    pub page_load_time: PageLoadTime,
    pub tld: bool,
    pub subdomains: bool
}

#[derive(Deserialize, Serialize, Debug, Default, Clone, Eq, Hash, PartialEq)]
/// general issue structure from collection unmodified.
pub struct PageIssue {
    #[serde(rename = "pageUrl")]
    pub page_url: String,
    pub domain: String,
    pub issues: Option<Vec<Issue>>,
    #[serde(rename = "pageInsights")]
    pub page_insights: bool,
}
