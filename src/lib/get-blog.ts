import { DOMAIN_NAME } from '@app/configs'
import { parseHtml } from './parse-html'
import type { BlogPageProps } from '@app/types'

const BLOG_WEBFLOW_URL =
  process.env.BLOG_WEBFLOW_URL || 'https://a11ywatch-blog.webflow.io'

// determine if the path is from WP or webflow [TODO: revalidate and just use query]
const getUrl = (q: string) => {
  if (q === '/' || !q) {
    return BLOG_WEBFLOW_URL
  }

  const containsAuthors = q.startsWith('/authors/') || q.startsWith('authors/')
  const containsCategories =
    q.startsWith('/categories/') || q.startsWith('categories/')

  let baseFolder = ''
  let query = q

  if (!(containsAuthors || containsCategories)) {
    baseFolder = '/blog'
    query = `${query.replace('blog/', '')}`
  }

  return (
    BLOG_WEBFLOW_URL + baseFolder + `${query[0] === '/' ? query : `/${query}`}`
  )
}

// get Blog page and parse content by themes
export const getBlogPage = async (
  pathname: string,
  directUrl?: boolean
): Promise<BlogPageProps> => {
  const links: BlogPageProps['links'] = []
  const stylesheets: BlogPageProps['stylesheets'] = []
  const metas: BlogPageProps['metas'] = []
  const headScripts: BlogPageProps['headScripts'] = []
  const bodyScripts: BlogPageProps['bodyScripts'] = []
  let html = ''
  let title = ''

  const websiteUrl = directUrl ? pathname : getUrl(pathname)

  try {
    const res = await fetch(websiteUrl)

    if (res && res?.ok) {
      const response = await res?.text()

      if (response) {
        const htmlRoot = await parseHtml(response)

        const titleElement = htmlRoot.querySelector('title')
        const blogLinks = htmlRoot.querySelectorAll(`link`)
        const metaTags = htmlRoot.querySelectorAll(`meta`)

        const cssSheets = htmlRoot.querySelectorAll('style')
        const headTag = htmlRoot.querySelector(`head`)
        const colophon = htmlRoot.getElementById('colophon')
        const authorPrefix = htmlRoot.querySelectorAll('.author-prefix')

        const comments = htmlRoot.getElementById('comments')
        const htmlTag = htmlRoot.querySelector(`html`)
        const bodyTag = htmlRoot.querySelector(`body`)
        const wfbadge = htmlRoot.querySelector(`.w-webflow-badge`)

        // remove web font
        const webfont = htmlRoot.querySelector(
          `script[src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"]`
        )

        if (webfont) {
          webfont.remove()
        }

        if (colophon) {
          colophon.remove()
        }
        if (comments) {
          comments.remove()
        }
        if (wfbadge) {
          wfbadge.remove()
        }

        authorPrefix?.forEach((tag) => {
          tag.remove()
        })

        // IMPORTANT: scripts that belong in the head
        const startScripts = htmlRoot.querySelectorAll(`head script`)

        // quickly remove top level head scripts
        startScripts?.forEach((tag) => {
          const { crossorigin, ...a } = tag.attributes

          if (tag && tag?.innerText.includes('WebFont.load({') === false) {
            if (crossorigin) {
              headScripts.push({
                crossOrigin: crossorigin,
                ...a,
                children: tag.innerText,
              })
            } else {
              headScripts.push({ ...tag.attributes, children: tag.innerText })
            }
          }

          tag.remove()
        })

        // all other scripts after - step required since no body target
        const endingScripts = htmlRoot.querySelectorAll(`script`)

        endingScripts?.forEach((tag) => {
          const { crossorigin, ...a } = tag.attributes

          if (tag && tag?.innerText.includes('WebFont.load({') === false) {
            if (crossorigin) {
              bodyScripts.push({
                crossOrigin: crossorigin,
                ...a,
                children: tag.innerText,
              })
            } else {
              bodyScripts.push({ ...tag.attributes, children: tag.innerText })
            }
          }

          tag.remove()
        })

        metaTags?.forEach((tag) => {
          const { crossorigin, charset, ...a } = tag.attributes

          if (!charset) {
            if (a && a?.name !== 'viewport') {
              if (crossorigin) {
                metas.push({ crossOrigin: crossorigin, ...a })
              } else {
                metas.push(a)
              }
            }
          }

          tag.remove()
        })

        blogLinks.forEach((link) => {
          const atr = link.attributes
          const rel = atr && 'rel' in atr ? atr.rel : '' // relative links to CMS not website

          if (
            !['apple-touch-icon', 'icon', 'manifest', 'shortcut icon'].includes(
              rel
            )
          ) {
            links.push(link.attributes)
          }

          link.remove()
        })

        const h1Tags = htmlRoot.querySelectorAll(`h1`)

        h1Tags?.forEach((h1, index) => {
          if (index >= 1) {
            let clone = h1
            clone.tagName = 'h2'

            h1.replaceWith(clone)
          }
        })

        const h2Tags = htmlRoot.querySelectorAll(`h2`)

        h2Tags?.forEach((h2, index) => {
          if (index >= 1) {
            let clone = h2
            clone.tagName = 'h3'

            h2.replaceWith(clone)
          }
        })

        title = titleElement?.structuredText || ''

        htmlRoot.insertAdjacentHTML(
          'beforeend',
          `<style>

          ${
            directUrl
              ? `
              body {
                width: auto;
              }

              body .blog-main {
                width: 60em;
                margin: 1em auto;
                font-family: system-ui;
                padding-bottom: 4em;
              }
            
              p {
                padding-bottom: 3px;
                padding-top: 3px;
              }

          `
              : ''
          }

              .blog-main h1 {
                font-size: 2.25rem;
                font-weight: 800;
              }
              .blog-main h2 {
                font-size: 1.875rem;
                font-weight: 700;
                padding-top: 0.5rem;
                padding-bottom: 0.3rem;
              }
              .blog-main h3 {
                font-size: 1.5rem;
                font-weight: 600;
                padding-top: 0.35rem;
                padding-bottom: 0.2rem;
              }
              .blog-main h4 {
                font-weight: 500;
                font-size: 1.25rem;
                font-weight: 700;
                padding-top: 0.28rem;
                padding-bottom: 0.18rem;
              }
              .blog-main h5 {
                font-size: 1.125rem;
                font-weight: 500;
                padding-top: 0.24rem;
                padding-bottom: 0.14rem;
              }
              .blog-main h6 {
                font-size: 1rem;
                font-weight: 500;
                padding-top: 0.21rem;
                padding-bottom: 0.12rem;
              }
              .blog-main .entry-date.published, .blog-date {
                color: rgba(117, 117, 117, 1);
              }
              .blog-main a {
                color: rgb(37, 99, 235);
                text-decoration: none;
                padding: 0.2em;
              }
          </style>
          `
        )

        cssSheets.forEach((sheet) => {
          sheet.removeWhitespace()

          stylesheets.push({
            ...sheet.attributes,
            children: sheet.innerText,
          })
          sheet.remove()
        })

        titleElement?.remove()
        htmlRoot.removeWhitespace()
        headTag?.remove()

        if (htmlTag && bodyTag) {
          bodyTag.tagName = 'div'
          htmlTag?.replaceWith(bodyTag)
        }

        html = htmlRoot.innerHTML
          .replace(`<!doctype html><html lang="en-US">`, '')
          .replace(`</html>`, '')
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
    websiteUrl: websiteUrl.replace(
      BLOG_WEBFLOW_URL,
      DOMAIN_NAME?.replace('.com', '.blog')
    ),
  }
}
