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

export function getTxStatus(status: number): string {
  switch (status) {
    case 1:
      return '결제완료'
    case 2:
      return '결제대기'
    case 3:
      return '배송중'
    case 4:
      return '배송완료'
    case 5:
      return '환불처리'
    case 7:
      return '거래취소'
    default:
      return '알 수 없음'
  }
}
