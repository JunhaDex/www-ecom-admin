export function orderPageItemList(list: any[], props: string[]): { [key: number]: any }[] {
  const orderedList = []
  for (const item of list) {
    const orderedItem = {} as any
    for (let i = 0; i < props.length; i++) {
      orderedItem[i] = item[props[i]] ?? null
    }
    orderedList.push(orderedItem)
  }
  return orderedList
}

export function processQuillContent(htmlContent: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const images = doc.getElementsByTagName('img')
  const uploaded: { original: string; replace: string }[] = []
  for (const img of Array.from(images)) {
    // TODO: upload image
    uploaded.push({ original: img.src, replace: 'somewhat' })
  }
  let result = htmlContent
  for (const img of uploaded) {
    result = result.replace(img.original, img.replace)
  }
  return result
}
