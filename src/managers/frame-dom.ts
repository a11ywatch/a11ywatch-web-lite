export const frameDom: any = {
  dom: null,
  html: '',
  clearDom: () => {
    frameDom.dom = null
  },
  setFrameDom: (dom: Document) => {
    if (dom) {
      if (!frameDom?.dom) {
        if (
          dom?.documentElement?.outerHTML &&
          dom?.documentElement?.outerHTML !==
            '<html><head></head><body></body></html>'
        ) {
          frameDom.html = dom.documentElement.outerHTML
        }
      }
      frameDom.dom = dom
    }
  },
}
