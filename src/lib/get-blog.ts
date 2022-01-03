/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import type { BlogPageProps } from '@app/types'

const BLOG_URL = process.env.BLOG_URL || 'https://a11ywatch.wpcomstaging.com'

// get wordpress page and parse content by themes
export const getBlogPage = async (
  websiteUrl: string
): Promise<BlogPageProps> => {
  const links: BlogPageProps['links'] = []
  const stylesheets: BlogPageProps['stylesheets'] = []
  const metas: BlogPageProps['metas'] = []
  const headScripts: BlogPageProps['headScripts'] = []
  const bodyScripts: BlogPageProps['bodyScripts'] = []
  let html = ''
  let title = ''

  try {
    const res = await fetch(`${BLOG_URL}${websiteUrl ? `/${websiteUrl}` : ''}`)
    const { parse } = await import('node-html-parser')

    if (res && res?.ok) {
      const response = await res?.text()

      if (response) {
        const htmlRoot = parse(response)

        const siteNavigationAnchor = htmlRoot.querySelector(
          '#site-navigation a'
        )
        const titleElement = htmlRoot.querySelector('title')
        const adminBar = htmlRoot.querySelector('#wpadminbar')
        const blogAnchors = htmlRoot.querySelectorAll(`a[href^="${BLOG_URL}"]`)
        const blogLinks = htmlRoot.querySelectorAll(`link`)
        const footer = htmlRoot.querySelector('.footer-wrap')
        const navMenu = htmlRoot.querySelector('.menu-area')
        const statsScript = htmlRoot.querySelector(
          `script[src^="https://stats.wp.com"]`
        )
        const metaTags = htmlRoot.querySelectorAll(`meta`)
        const shareSection = htmlRoot.querySelectorAll(`.sharedaddy`)
        const cssSheets = htmlRoot.querySelectorAll('style')

        // wordpress stats - disable for app analytics
        statsScript?.remove()

        // IMPORTANT: scripts that belong in the head
        const startScripts = htmlRoot.querySelectorAll(`head script`)

        // quickly remove top level head scripts
        startScripts?.forEach((tag) => {
          headScripts.push({ ...tag.attributes, children: tag.innerText })
          tag.remove()
        })

        // all other scripts after - step required since no body target
        const endingScripts = htmlRoot.querySelectorAll(`script`)

        endingScripts?.forEach((tag) => {
          bodyScripts.push({ ...tag.attributes, children: tag.innerText })
          tag.remove()
        })

        // manipulate links that are blog pages relativeness
        blogAnchors.forEach((link) => {
          const url = link.getAttribute('href') || ''
          if (url) {
            link.setAttribute(
              'href',
              url.replace(
                BLOG_URL,
                process.env.NODE_ENV === 'development' ? '/blog' : ''
              )
            )
          }
        })

        shareSection?.forEach((tag) => {
          tag.remove()
        })

        metaTags?.forEach((tag) => {
          metas.push(tag.attributes)
          tag.remove()
        })

        blogLinks.forEach((link) => {
          links.push(link.attributes)
          link.remove()
        })

        title = titleElement?.structuredText || ''

        adminBar?.remove()
        footer?.remove()
        titleElement?.remove()
        siteNavigationAnchor?.remove()
        navMenu?.remove()

        htmlRoot.insertAdjacentHTML(
          'beforeend',
          `<style type="text/css">

        #content, #comments {
          padding-top: 20px;
          padding-bottom: 20px;
          overflow: hidden;
         }

        .light-background {
          background-color: #fff;
        }
        .dark-background {
          background-color: rgb(26, 26, 26);
        }
        </style>`
        )

        cssSheets.forEach((sheet) => {
          stylesheets.push({
            ...sheet.attributes,
            children: sheet.innerText,
          })
          sheet.remove()
        })

        html = htmlRoot.toString()
      }
    }
  } catch (e) {
    console.error(e)
  }

  return {
    name: '',
    html,
    title,
    links,
    stylesheets,
    metas,
    bodyScripts,
    headScripts,
  }
}
