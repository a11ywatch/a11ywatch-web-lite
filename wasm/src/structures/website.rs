use serde::{Deserialize, Serialize};
use crate::structures::{Issue, IssueInfo};

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct LightHouse {
    pub json: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct PageLoadTime {
    pub duration: String,
    #[serde(rename = "durationFormated")]
    pub duration_formated: String,
    pub color: String,
}

#[derive(Deserialize, Serialize, Debug, Default, Clone)]
pub struct Website {
    pub url: String,
    pub domain: String,
    #[serde(rename = "cdnConnected")]
    pub cdn_connected: bool,
    #[serde(rename = "issuesInfo")]
    pub issues_info: IssueInfo,
    pub issues: Option<Vec<Issue>>,
    pub online: bool,
    #[serde(rename = "lastScanDate")]
    pub last_scan_date: String,
    pub insight: Option<LightHouse>,
    #[serde(rename = "pageLoadTime")]
    pub page_load_time: PageLoadTime,
}
