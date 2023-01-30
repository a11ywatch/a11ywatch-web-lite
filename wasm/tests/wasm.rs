extern crate serde;
extern crate a11ywatch_web_wasm;
extern crate serde_wasm_bindgen;

use wasm_bindgen_test::*;
use a11ywatch_web_wasm::structures::website::{PageIssue};
use a11ywatch_web_wasm::Feed;

#[wasm_bindgen_test]
fn insert_website() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None,
        page_insights: false,
        issues_info: None,
        page_load_time: None
    };
    let value = serde_wasm_bindgen::to_value(&web).unwrap();

    let web1: PageIssue = PageIssue {
        page_url: "https://jeffmendez.com".to_string(),
        domain: "jeffmendez.com".to_string(),
        issues: None,
        page_insights: false,
        issues_info: None,
        page_load_time: None
    };
    let value1 = serde_wasm_bindgen::to_value(&web1).unwrap();

    feed.insert_website(value.clone());
    feed.insert_website(value1.clone());

    let website = feed.get_page(web.domain, web.page_url);
    let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();
    assert_eq!(website.domain, "a11ywatch.com");
    let website = feed.get_page(web1.domain, web1.page_url);
    let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();
    assert_eq!(website.domain, "jeffmendez.com");
}

#[wasm_bindgen_test]
fn get_page() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None,
        page_insights: false,
        issues_info: None,
        page_load_time: None
    };

    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    
    feed.insert_website(value.clone());

    let website = feed.get_page(web.domain, web.page_url);
    let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();

    assert_eq!(website.domain, "a11ywatch.com");
}

#[wasm_bindgen_test]
fn get_website_item() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        page_insights: false,
        ..Default::default()
    };

    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    feed.insert_website(value.clone());

    let website = feed.get_data_item("a11ywatch.com".to_string(), false);
    let website: Vec<PageIssue> = serde_wasm_bindgen::from_value(website).unwrap();

    assert_eq!(website.is_empty(), false);
}

#[wasm_bindgen_test]
fn sort_website() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://hbo.com/about".to_string(),
        domain: "hbo.com".to_string(),
        page_insights: false,
        ..Default::default()
    };
    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    feed.insert_website(value.clone());

    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        page_insights: false,
        ..Default::default()
    };

    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    feed.insert_website(value.clone());
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/about".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None,
        page_insights: false,
        ..Default::default()
    };
    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    feed.insert_website(value.clone());

    feed.sort_website("a11ywatch.com".to_string());
    let website = feed.get_data_item("a11ywatch.com".to_string(), false);
    let website: Vec<PageIssue> = serde_wasm_bindgen::from_value(website).unwrap();

    assert_eq!(website[0].page_url, "https://a11ywatch.com/about");
}

#[wasm_bindgen_test]
fn get_keys() {
    let mut feed = Feed::new();

    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/about".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None,
        page_insights: false,
        ..Default::default()
    };
    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    feed.insert_website(value.clone());

    let website = feed.get_data_keys();
    let website: Vec<String> = serde_wasm_bindgen::from_value(website).unwrap();

    assert_eq!(website[0], "a11ywatch.com");
}

