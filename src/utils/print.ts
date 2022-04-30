const printElement = (searchElement?: any, website?: any) => {
  if (typeof window === 'undefined') {
    return false
  }

  if (typeof document !== 'undefined') {
    const divContents = document?.getElementById(searchElement)?.innerHTML
    const printWindow = window.open('', '', 'height=500, width=600')

    if (!divContents) {
      return null
    }
    if (printWindow && 'document' in printWindow) {
      printWindow.document.write(
        `<html><body><h1 style="margin-left:10px;">${website?.url} WCAG Report</h1>`
      )
      printWindow.document.write(divContents)
      printWindow.document.write('</body></html>')
      printWindow.document?.close()
      printWindow?.print()
    } else {
      window.alert('Device not capable of printing')
    }
  }
}

export { printElement }
