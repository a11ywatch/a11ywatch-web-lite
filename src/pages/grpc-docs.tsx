import { MarketingDrawer, PageTitle } from '@app/components/general'

import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Head from 'next/head'
import { companyName } from '@app/configs'

// inline gRPC docs. If revision change constantly redirect to API
function GrpcDocs({ name }: PageProps) {
  return (
    <>
      <Head>
        <style>
          {`

      table {
        width: 100%;
        font-size: 80%;
        border-collapse: collapse;
      }

      thead {
        font-weight: 700;
        background-color: #dcdcdc;
      }

      tbody tr:nth-child(even) {
        background-color: #fbfbfb;
      }

      td {
        border: 1px solid #ccc;
        padding: 0.25rem;
      }

      td p {
        text-indent: 1em;
        margin: 0;
      }

      td p:nth-child(1) {
        text-indent: 0;  
      }

      .field-table td:nth-child(1) {  
        width: 10em;
      }
      .field-table td:nth-child(2) {  
        width: 10em;
      }
      .field-table td:nth-child(3) {  
        width: 6em;
      }
      .field-table td:nth-child(4) {  
        width: auto;
      }

      .extension-table td:nth-child(1) {  
        width: 10em;
      }
      .extension-table td:nth-child(2) {  
        width: 10em;
      }
      .extension-table td:nth-child(3) {  
        width: 10em;
      }
      .extension-table td:nth-child(4) {  
        width: 5em;
      }
      .extension-table td:nth-child(5) {  
        width: auto;
      }

      .enum-table td:nth-child(1) {  
        width: 10em;
      }
      .enum-table td:nth-child(2) {  
        width: 10em;
      }
      .enum-table td:nth-child(3) {  
        width: auto;
      }

       
      .scalar-value-types-table tr {
        height: 3em;
      }
       
      #toc-container ul {
        list-style-type: none;
        padding-left: 1em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        line-height: 180%;
        margin: 0;
      }
      #toc > li > a {
        font-weight: bold;
        padding-bottom: 0.3em;
        padding-top: 0.3em;
      }

      .file-heading {
        width: 100%;
        display: table;
        border-bottom: 1px solid #aaa;
        margin: 4em 0 1.5em 0;
      }
      .file-heading h2 {
        border: none;
        display: table-cell;
      }
      .file-heading a {
        text-align: right;
        display: table-cell;
      }

      .badge {
        width: 1.6em;
        height: 1.6em;
        display: inline-block;
        line-height: 1.6em;
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: rgb(22 101 52);
        margin: 0.5ex 1em 0.5ex -1em;
        border: 1px solid #fbfbfb;
        border-radius: 1.5ex;
      }`}
        </style>
      </Head>
      <MarketingDrawer title={name} footerSpacing>
        <PageTitle id='title'>gRPC Protocol Documentation</PageTitle>
        <div className='py-4'>
          <div className='border-t border-b py-2'>
            <h2 className='text-lg'>Table of Contents</h2>
          </div>
        </div>

        <div id='toc-container'>
          <ul id='toc'>
            <li>
              <a href='#proto/crawler.proto'>proto/crawler.proto</a>
              <ul>
                <li>
                  <a href='#crawler.ScanReply'>
                    <span className='badge'>M</span>ScanReply
                  </a>
                </li>

                <li>
                  <a href='#crawler.ScanRequest'>
                    <span className='badge'>M</span>ScanRequest
                  </a>
                </li>

                <li>
                  <a href='#crawler.Crawler'>
                    <span className='badge'>S</span>Crawler
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href='#proto/health.proto'>proto/health.proto</a>
              <ul>
                <li>
                  <a href='#health.HealthCheckReply'>
                    <span className='badge'>M</span>HealthCheckReply
                  </a>
                </li>

                <li>
                  <a href='#health.HealthCheckRequest'>
                    <span className='badge'>M</span>HealthCheckRequest
                  </a>
                </li>

                <li>
                  <a href='#health.HealthCheck'>
                    <span className='badge'>S</span>HealthCheck
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href='#proto/mav.proto'>proto/mav.proto</a>
              <ul>
                <li>
                  <a href='#Img'>
                    <span className='badge'>M</span>Img
                  </a>
                </li>

                <li>
                  <a href='#ParseParams'>
                    <span className='badge'>M</span>ParseParams
                  </a>
                </li>

                <li>
                  <a href='#Mav'>
                    <span className='badge'>S</span>Mav
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href='#proto/pagemind.proto'>proto/pagemind.proto</a>
              <ul>
                <li>
                  <a href='#Headers'>
                    <span className='badge'>M</span>Headers
                  </a>
                </li>

                <li>
                  <a href='#IssueMeta'>
                    <span className='badge'>M</span>IssueMeta
                  </a>
                </li>

                <li>
                  <a href='#Issues'>
                    <span className='badge'>M</span>Issues
                  </a>
                </li>

                <li>
                  <a href='#IssuesInfo'>
                    <span className='badge'>M</span>IssuesInfo
                  </a>
                </li>

                <li>
                  <a href='#Page'>
                    <span className='badge'>M</span>Page
                  </a>
                </li>

                <li>
                  <a href='#PageLoadTime'>
                    <span className='badge'>M</span>PageLoadTime
                  </a>
                </li>

                <li>
                  <a href='#Problem'>
                    <span className='badge'>M</span>Problem
                  </a>
                </li>

                <li>
                  <a href='#ScanParams'>
                    <span className='badge'>M</span>ScanParams
                  </a>
                </li>

                <li>
                  <a href='#Web'>
                    <span className='badge'>M</span>Web
                  </a>
                </li>

                <li>
                  <a href='#Pagemind'>
                    <span className='badge'>S</span>Pagemind
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href='#proto/website.proto'>proto/website.proto</a>
              <ul>
                <li>
                  <a href='#website.Empty'>
                    <span className='badge'>M</span>Empty
                  </a>
                </li>

                <li>
                  <a href='#website.ScanParams'>
                    <span className='badge'>M</span>ScanParams
                  </a>
                </li>

                <li>
                  <a href='#website.ScanStreamResponse'>
                    <span className='badge'>M</span>ScanStreamResponse
                  </a>
                </li>

                <li>
                  <a href='#website.WebsiteService'>
                    <span className='badge'>S</span>WebsiteService
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href='#scalar-value-types'>Scalar Value Types</a>
            </li>
          </ul>
        </div>

        <div className='text-base'>
          <div className='file-heading'>
            <h3 id='proto/crawler.proto'>proto/crawler.proto</h3>
            <a href='#title'>Top</a>
          </div>

          <h4
            className='py-3 border-b border-t font-bold'
            id='crawler.ScanReply'
          >
            ScanReply
          </h4>

          <p className='py-2'>basic reply message.</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>message</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>message of the scan success. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4
            className='py-3 border-b border-t font-bold'
            id='crawler.ScanRequest'
          >
            ScanRequest
          </h4>

          <p className='py-2'>Request params for crawling generically.</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>url</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the base request to start crawling/indexing pages. </p>
                </td>
              </tr>

              <tr>
                <td>id</td>
                <td>
                  <a href='#uint32'>uint32</a>
                </td>
                <td></td>
                <td>
                  <p>the user id or identifier to track crawl subs. </p>
                </td>
              </tr>

              <tr>
                <td>norobots</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>ignore respect robots txt file rules. </p>
                </td>
              </tr>

              <tr>
                <td>agent</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>User agent to use when crawling. </p>
                </td>
              </tr>

              <tr>
                <td>subdomains</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>allow subdomain crawling. </p>
                </td>
              </tr>

              <tr>
                <td>tld</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>allow tld crawling all . ext. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='crawler.Crawler'>
            Crawler
          </h4>

          <p className='py-2'>
            The web indexer to find links async. Default port starts on [50055].
          </p>
          <table className='enum-table'>
            <thead>
              <tr>
                <td>Method Name</td>
                <td>Request Type</td>
                <td>Response Type</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Scan</td>
                <td>
                  <a href='#crawler.ScanRequest'>ScanRequest</a>
                </td>
                <td>
                  <a href='#crawler.ScanReply'>ScanReply</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>

              <tr>
                <td>Crawl</td>
                <td>
                  <a href='#crawler.ScanRequest'>ScanRequest</a>
                </td>
                <td>
                  <a href='#crawler.ScanReply'>ScanReply</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='file-heading'>
            <h3 id='proto/health.proto'>proto/health.proto</h3>
            <a href='#title'>Top</a>
          </div>

          <h4
            className='py-3 border-b border-t font-bold'
            id='health.HealthCheckReply'
          >
            HealthCheckReply
          </h4>

          <p className='py-2'>the health status</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>healthy</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>bool to indicate health or online. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4
            className='py-3 border-b border-t font-bold'
            id='health.HealthCheckRequest'
          >
            HealthCheckRequest
          </h4>

          <p className='py-2'>empty request</p>

          <h4
            className='py-3 border-b border-t font-bold'
            id='health.HealthCheck'
          >
            HealthCheck
          </h4>

          <p className='py-2'>check if a service is good and healthy</p>
          <table className='enum-table'>
            <thead>
              <tr>
                <td>Method Name</td>
                <td>Request Type</td>
                <td>Response Type</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>check</td>
                <td>
                  <a href='#health.HealthCheckRequest'>HealthCheckRequest</a>
                </td>
                <td>
                  <a href='#health.HealthCheckReply'>HealthCheckReply</a>
                </td>
                <td>
                  <p>determine if server is alive.</p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='file-heading'>
            <h3 id='proto/mav.proto'>proto/mav.proto</h3>
            <a href='#title'>Top</a>
          </div>

          <h4 className='py-3 border-b border-t font-bold' id='Img'>
            Img
          </h4>
          <p className='py-2'>the image returned as a readable text</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>className</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the name of the image. </p>
                </td>
              </tr>

              <tr>
                <td>probability</td>
                <td>
                  <a href='#float'>float</a>
                </td>
                <td></td>
                <td>
                  <p>the accuracy of the image being true. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='ParseParams'>
            ParseParams
          </h4>
          <p className='py-2'>params to use on image parsing.</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>img</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>base64 string of the image. </p>
                </td>
              </tr>

              <tr>
                <td>width</td>
                <td>
                  <a href='#int64'>int64</a>
                </td>
                <td></td>
                <td>
                  <p>image approx width. </p>
                </td>
              </tr>

              <tr>
                <td>height</td>
                <td>
                  <a href='#int64'>int64</a>
                </td>
                <td></td>
                <td>
                  <p>image approx height. </p>
                </td>
              </tr>

              <tr>
                <td>url</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>url of the image. </p>
                </td>
              </tr>

              <tr>
                <td>cv</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>perform with Computer Vision API. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='Mav'>
            Mav
          </h4>
          <p className='py-2'>
            Image finding service to determine descriptions. Default port starts
            on [50053].
          </p>
          <table className='enum-table'>
            <thead>
              <tr>
                <td>Method Name</td>
                <td>Request Type</td>
                <td>Response Type</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ParseImg</td>
                <td>
                  <a href='#ParseParams'>ParseParams</a>
                </td>
                <td>
                  <a href='#Img'>Img</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='file-heading'>
            <h3 id='proto/pagemind.proto'>proto/pagemind.proto</h3>
            <a href='#title'>Top</a>
          </div>

          <h4 className='py-3 border-b border-t font-bold' id='Headers'>
            Headers
          </h4>

          <p className='py-2'>crawl page headers to set per request.</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>key</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>key of the header. </p>
                </td>
              </tr>

              <tr>
                <td>value</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>value of the key. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='IssueMeta'>
            IssueMeta
          </h4>
          <p className='py-2'>
            meta details for the page to include extra supportive features.
          </p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>skipContentIncluded</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>
                    add a skip content button onto the script if not found.{' '}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='Issues'>
            Issues
          </h4>
          <p className='py-2'>the generic issues structure</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>documentTitle</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>document page title. </p>
                </td>
              </tr>

              <tr>
                <td>pageUrl</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the page url for the issue report. </p>
                </td>
              </tr>

              <tr>
                <td>issues</td>
                <td>
                  <a href='#Problem'>Problem</a>
                </td>
                <td>repeated</td>
                <td>
                  <p>all of the issues that occurred on the page. </p>
                </td>
              </tr>

              <tr>
                <td>domain</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the domain of the page. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='IssuesInfo'>
            IssuesInfo
          </h4>
          <p className='py-2'>
            info to use to gather all stats for the issues on the page.
          </p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>possibleIssuesFixedByCdn</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>possible issues that may be fixed using the cdn. </p>
                </td>
              </tr>

              <tr>
                <td>totalIssues</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>all of the page issues. </p>
                </td>
              </tr>

              <tr>
                <td>issuesFixedByCdn</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>how many issues that are fixed using the cdn. </p>
                </td>
              </tr>

              <tr>
                <td>errorCount</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>errors on the page. </p>
                </td>
              </tr>

              <tr>
                <td>warningCount</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>warnings on the page. </p>
                </td>
              </tr>

              <tr>
                <td>noticeCount</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>
                    notices on the page that mainly used for info purposes.{' '}
                  </p>
                </td>
              </tr>

              <tr>
                <td>accessScore</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>rough accessibility score. </p>
                </td>
              </tr>

              <tr>
                <td>issueMeta</td>
                <td>
                  <a href='#IssueMeta'>IssueMeta</a>
                </td>
                <td></td>
                <td>
                  <p>extra data on the issue. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='Page'>
            Page
          </h4>
          <p className='py-2'>page model of all helpful insight</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>domain</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the domain for the request [example.com]. </p>
                </td>
              </tr>

              <tr>
                <td>url</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the url of the request with http or https </p>
                </td>
              </tr>

              <tr>
                <td>pageLoadTime</td>
                <td>
                  <a href='#PageLoadTime'>PageLoadTime</a>
                </td>
                <td></td>
                <td>
                  <p>page load time. </p>
                </td>
              </tr>

              <tr>
                <td>insight</td>
                <td>
                  <a
                    href='https://developers.google.com/protocol-buffers/docs/reference/google.protobuf'
                    rel='noopener'
                  >
                    google.protobuf.Struct
                  </a>
                </td>
                <td></td>
                <td>
                  <p>the json details from lighthouse </p>
                </td>
              </tr>

              <tr>
                <td>issuesInfo</td>
                <td>
                  <a href='#IssuesInfo'>IssuesInfo</a>
                </td>
                <td></td>
                <td>
                  <p>issues on the page. </p>
                </td>
              </tr>

              <tr>
                <td>lastScanDate</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the last date of the scan. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='PageLoadTime'>
            PageLoadTime
          </h4>
          <p className='py-2'>how fast the page loaded.</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>duration</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>duration in ms. </p>
                </td>
              </tr>

              <tr>
                <td>durationFormated</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>durations formatted to a readable message. </p>
                </td>
              </tr>

              <tr>
                <td>color</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>color indicator for the message. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='Problem'>
            Problem
          </h4>
          <p className='py-2'>
            the issue that occurred, either of type error, notice, warning in
            desc order.
          </p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>code</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>wcag error code. </p>
                </td>
              </tr>

              <tr>
                <td>type</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>warning, error, or notice. </p>
                </td>
              </tr>

              <tr>
                <td>typeCode</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>error code. </p>
                </td>
              </tr>

              <tr>
                <td>message</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the issue with possible recommendations. </p>
                </td>
              </tr>

              <tr>
                <td>context</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the element of the issue. </p>
                </td>
              </tr>

              <tr>
                <td>selector</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the html selector. </p>
                </td>
              </tr>

              <tr>
                <td>runner</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the runner type for the scan. </p>
                </td>
              </tr>

              <tr>
                <td>recurrence</td>
                <td>
                  <a href='#int32'>int32</a>
                </td>
                <td></td>
                <td>
                  <p>how many times the issue appeared. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='ScanParams'>
            ScanParams
          </h4>
          <p className='py-2'>the params to configure testing and output</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>userId</td>
                <td>
                  <a href='#uint32'>uint32</a>
                </td>
                <td></td>
                <td>
                  <p>user identifier. </p>
                </td>
              </tr>

              <tr>
                <td>url</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the page url to run tests on. </p>
                </td>
              </tr>

              <tr>
                <td>pageHeaders</td>
                <td>
                  <a href='#Headers'>Headers</a>
                </td>
                <td>repeated</td>
                <td>
                  <p>heads to include when running. </p>
                </td>
              </tr>

              <tr>
                <td>pageInsights</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>Run lighthouse reports. </p>
                </td>
              </tr>

              <tr>
                <td>noStore</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>Do not store to AWS script changes. </p>
                </td>
              </tr>

              <tr>
                <td>mobile</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>Run as mobile view port. </p>
                </td>
              </tr>

              <tr>
                <td>actions</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td>repeated</td>
                <td>
                  <p>List of actions to run on page. </p>
                </td>
              </tr>

              <tr>
                <td>ua</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>User agent to use for request. </p>
                </td>
              </tr>

              <tr>
                <td>standard</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>The WCAG standard to use WCAG2A, WCAG2AA, or WCAG2AAA. </p>
                </td>
              </tr>

              <tr>
                <td>hideElements</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>
                    CSS selector to hide elements from testing, selectors can be
                    comma separated.{' '}
                  </p>
                </td>
              </tr>

              <tr>
                <td>cv</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>can perform with Computer Vision. </p>
                </td>
              </tr>

              <tr>
                <td>pageSpeedApiKey</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>Google PageSpeed API key for request. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='Web'>
            Web
          </h4>
          <p className='py-2'>
            fields that build that Website that is treated as a Page.
          </p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>webPage</td>
                <td>
                  <a href='#Page'>Page</a>
                </td>
                <td></td>
                <td>
                  <p>the website information or stats. </p>
                </td>
              </tr>

              <tr>
                <td>issues</td>
                <td>
                  <a href='#Issues'>Issues</a>
                </td>
                <td></td>
                <td>
                  <p>all of the issues that relate to the page. </p>
                </td>
              </tr>

              <tr>
                <td>userId</td>
                <td>
                  <a href='#uint32'>uint32</a>
                </td>
                <td></td>
                <td>
                  <p>the user that made the request. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className='py-3 border-b border-t font-bold' id='Pagemind'>
            Pagemind
          </h4>
          <p className='py-2'>Accessibility and page metrics [50052].</p>
          <table className='enum-table'>
            <thead>
              <tr>
                <td>Method Name</td>
                <td>Request Type</td>
                <td>Response Type</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Scan</td>
                <td>
                  <a href='#ScanParams'>.ScanParams</a>
                </td>
                <td>
                  <a href='#Web'>.Web</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='file-heading'>
            <h3 id='proto/website.proto'>proto/website.proto</h3>
            <a href='#title'>Top</a>
          </div>

          <h4 className='py-3 border-b border-t font-bold' id='website.Empty'>
            Empty
          </h4>

          <p className='py-2'>send nothing mainly for triggering events.</p>

          <h4
            className='py-3 border-b border-t font-bold'
            id='website.ScanParams'
          >
            ScanParams
          </h4>

          <p className='py-2'>params to send when scanning pages.</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>pages</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td>repeated</td>
                <td>
                  <p>list of pages returned. </p>
                </td>
              </tr>

              <tr>
                <td>domain</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>the url base of the crawl. </p>
                </td>
              </tr>

              <tr>
                <td>user_id</td>
                <td>
                  <a href='#uint32'>uint32</a>
                </td>
                <td></td>
                <td>
                  <p>user id performing scan. </p>
                </td>
              </tr>

              <tr>
                <td>full</td>
                <td>
                  <a href='#bool'>bool</a>
                </td>
                <td></td>
                <td>
                  <p>full crawl awaiting all links. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4
            className='py-3 border-b border-t'
            id='website.ScanStreamResponse'
          >
            ScanStreamResponse
          </h4>

          <p className='py-2'>send streamed response</p>

          <table className='field-table'>
            <thead>
              <tr>
                <td>Field</td>
                <td>Type</td>
                <td>Label</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>message</td>
                <td>
                  <a href='#string'>string</a>
                </td>
                <td></td>
                <td>
                  <p>message of the scan success or if should terminate. </p>
                </td>
              </tr>
            </tbody>
          </table>

          <h4
            className='py-3 border-b border-t font-bold'
            id='website.WebsiteService'
          >
            WebsiteService
          </h4>

          <p className='py-2'>
            Central API that manages your website between starting single and
            multi page scans. Default port starts on [50051].
          </p>

          <table className='enum-table'>
            <thead>
              <tr>
                <td>Method Name</td>
                <td>Request Type</td>
                <td>Response Type</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ScanStart</td>
                <td>
                  <a href='#website.ScanParams'>ScanParams</a>
                </td>
                <td>
                  <a href='#website.Empty'>Empty</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>

              <tr>
                <td>ScanEnd</td>
                <td>
                  <a href='#website.ScanParams'>ScanParams</a>
                </td>
                <td>
                  <a href='#website.Empty'>Empty</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>

              <tr>
                <td>Scan</td>
                <td>
                  <a href='#website.ScanParams'>ScanParams</a>
                </td>
                <td>
                  <a href='#website.Empty'>Empty</a>
                </td>
                <td>
                  <p></p>
                </td>
              </tr>

              <tr>
                <td>ScanStream</td>
                <td>
                  <a href='#website.ScanParams'>ScanParams</a>
                </td>
                <td>
                  <a href='#website.ScanStreamResponse'>ScanStreamResponse</a>{' '}
                  stream
                </td>
                <td>
                  <p></p>
                </td>
              </tr>
            </tbody>
          </table>

          <h3
            className='py-3 border-b border-t font-bold'
            id='scalar-value-types'
          >
            Scalar Value Types
          </h3>

          <table className='scalar-value-types-table'>
            <thead>
              <tr>
                <td>.proto Type</td>
                <td>Notes</td>
                <td>C++</td>
                <td>Java</td>
                <td>Python</td>
                <td>Go</td>
                <td>C#</td>
                <td>PHP</td>
                <td>Ruby</td>
              </tr>
            </thead>
            <tbody>
              <tr id='double'>
                <td>double</td>
                <td></td>
                <td>double</td>
                <td>double</td>
                <td>float</td>
                <td>float64</td>
                <td>double</td>
                <td>float</td>
                <td>Float</td>
              </tr>

              <tr id='float'>
                <td>float</td>
                <td></td>
                <td>float</td>
                <td>float</td>
                <td>float</td>
                <td>float32</td>
                <td>float</td>
                <td>float</td>
                <td>Float</td>
              </tr>

              <tr id='int32'>
                <td>int32</td>
                <td>
                  Uses variable-length encoding. Inefficient for encoding
                  negative numbers – if your field is likely to have negative
                  values, use sint32 instead.
                </td>
                <td>int32</td>
                <td>int</td>
                <td>int</td>
                <td>int32</td>
                <td>int</td>
                <td>integer</td>
                <td>Bignum or Fixnum (as required)</td>
              </tr>

              <tr id='int64'>
                <td>int64</td>
                <td>
                  Uses variable-length encoding. Inefficient for encoding
                  negative numbers – if your field is likely to have negative
                  values, use sint64 instead.
                </td>
                <td>int64</td>
                <td>long</td>
                <td>int/long</td>
                <td>int64</td>
                <td>long</td>
                <td>integer/string</td>
                <td>Bignum</td>
              </tr>

              <tr id='uint32'>
                <td>uint32</td>
                <td>Uses variable-length encoding.</td>
                <td>uint32</td>
                <td>int</td>
                <td>int/long</td>
                <td>uint32</td>
                <td>uint</td>
                <td>integer</td>
                <td>Bignum or Fixnum (as required)</td>
              </tr>

              <tr id='uint64'>
                <td>uint64</td>
                <td>Uses variable-length encoding.</td>
                <td>uint64</td>
                <td>long</td>
                <td>int/long</td>
                <td>uint64</td>
                <td>ulong</td>
                <td>integer/string</td>
                <td>Bignum or Fixnum (as required)</td>
              </tr>

              <tr id='sint32'>
                <td>sint32</td>
                <td>
                  Uses variable-length encoding. Signed int value. These more
                  efficiently encode negative numbers than regular int32s.
                </td>
                <td>int32</td>
                <td>int</td>
                <td>int</td>
                <td>int32</td>
                <td>int</td>
                <td>integer</td>
                <td>Bignum or Fixnum (as required)</td>
              </tr>

              <tr id='sint64'>
                <td>sint64</td>
                <td>
                  Uses variable-length encoding. Signed int value. These more
                  efficiently encode negative numbers than regular int64s.
                </td>
                <td>int64</td>
                <td>long</td>
                <td>int/long</td>
                <td>int64</td>
                <td>long</td>
                <td>integer/string</td>
                <td>Bignum</td>
              </tr>

              <tr id='fixed32'>
                <td>fixed32</td>
                <td>
                  Always four bytes. More efficient than uint32 if values are
                  often greater than 2^28.
                </td>
                <td>uint32</td>
                <td>int</td>
                <td>int</td>
                <td>uint32</td>
                <td>uint</td>
                <td>integer</td>
                <td>Bignum or Fixnum (as required)</td>
              </tr>

              <tr id='fixed64'>
                <td>fixed64</td>
                <td>
                  Always eight bytes. More efficient than uint64 if values are
                  often greater than 2^56.
                </td>
                <td>uint64</td>
                <td>long</td>
                <td>int/long</td>
                <td>uint64</td>
                <td>ulong</td>
                <td>integer/string</td>
                <td>Bignum</td>
              </tr>

              <tr id='sfixed32'>
                <td>sfixed32</td>
                <td>Always four bytes.</td>
                <td>int32</td>
                <td>int</td>
                <td>int</td>
                <td>int32</td>
                <td>int</td>
                <td>integer</td>
                <td>Bignum or Fixnum (as required)</td>
              </tr>

              <tr id='sfixed64'>
                <td>sfixed64</td>
                <td>Always eight bytes.</td>
                <td>int64</td>
                <td>long</td>
                <td>int/long</td>
                <td>int64</td>
                <td>long</td>
                <td>integer/string</td>
                <td>Bignum</td>
              </tr>

              <tr id='bool'>
                <td>bool</td>
                <td></td>
                <td>bool</td>
                <td>boolean</td>
                <td>boolean</td>
                <td>bool</td>
                <td>bool</td>
                <td>boolean</td>
                <td>TrueClass/FalseClass</td>
              </tr>

              <tr id='string'>
                <td>string</td>
                <td>
                  A string must always contain UTF-8 encoded or 7-bit ASCII
                  text.
                </td>
                <td>string</td>
                <td>String</td>
                <td>str/unicode</td>
                <td>string</td>
                <td>string</td>
                <td>string</td>
                <td>String (UTF-8)</td>
              </tr>

              <tr id='bytes'>
                <td>bytes</td>
                <td>May contain any arbitrary sequence of bytes.</td>
                <td>string</td>
                <td>ByteString</td>
                <td>str</td>
                <td>[]byte</td>
                <td>ByteString</td>
                <td>string</td>
                <td>String (ASCII-8BIT)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </MarketingDrawer>
    </>
  )
}

export default metaSetter(
  { GrpcDocs },
  {
    title: `${companyName}: gRPC API documentation information`,
    description: 'The gRPC documentation for the system.',
  }
)
