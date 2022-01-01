/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const getBlogPage = async (
  websiteUrl: string
): Promise<{ html?: string; title: string; links: string[] }> => {
  const BLOG_URL = process.env.BLOG_URL || 'https://a11ywatch.wpcomstaging.com'
  let html = ''
  let title = ''
  let links: any[] = []

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

        const adminBar = htmlRoot.querySelector('#wpadminbar')

        const blogAnchors = htmlRoot.querySelectorAll(`a[href^="${BLOG_URL}"]`)
        const blogLinks = htmlRoot.querySelectorAll(`link`)

        // const externalScripts = htmlRoot.querySelectorAll(`script[src]`)

        const metaTags = htmlRoot.querySelectorAll(`meta`)
        const shareSection = htmlRoot.querySelectorAll(`.sharedaddy`)

        // const links = htmlRoot.querySelectorAll(`links`)

        adminBar?.remove()

        blogAnchors.forEach((link) => {
          const url = link.getAttribute('href') || ''

          url && link.setAttribute('href', url.replace(BLOG_URL, '/blog'))
        })

        // externalScripts?.forEach((tag) => {
        //   tag.remove()
        // })

        shareSection?.forEach((tag) => {
          tag.remove()
        })

        metaTags?.forEach((tag) => {
          tag.remove()
        })

        const titleElement = htmlRoot.querySelector('title')

        title = titleElement?.structuredText || ''

        titleElement?.remove()
        siteNavigationAnchor?.remove()

        htmlRoot.removeWhitespace()

        links = blogLinks.map((link) => {
          const newLink = { ...link.attributes }

          return newLink
        })

        blogLinks.forEach((link) => {
          link.remove()
        })

        htmlRoot.insertAdjacentHTML(
          'beforeend',
          `<style>
        .light-background {
          background-color: #fff;
        }
        .dark-background {
          background-color: rgb(26, 26, 26);
        }
        </style>`
        )

        // TODO: use theme variable classname
        html = `<div class="light-background">
          <div style="padding: 12px; background: #24292e;">
            <a href="https://a11ywatch.com">Back to A11ywatch.com</a>
          </div>
          ${htmlRoot.toString()}</div>`
      }
    }
  } catch (e) {
    console.error(e)
  }

  return { html, title, links }
}