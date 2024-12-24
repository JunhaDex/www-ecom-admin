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
