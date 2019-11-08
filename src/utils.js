export function defaultOrderByFn(arr, sortFn, dirs, columnId) {
  return arr.sort((rowA, rowB) => {
    const desc = dirs === false || dirs === 'desc'
    const sortInt = sortFn(rowA, rowB, columnId)
    if (sortInt !== 0) {
      return desc ? -sortInt : sortInt
    }
    return dirs ? rowA.index - rowB.index : rowB.index - rowA.index
  })
}
