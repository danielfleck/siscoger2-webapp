export function wrapCsvValue (val: any, formatFn: ((arg0: any) => any) | undefined) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)
  formatted = formatted.split('"').join('""')
  /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `"${formatted}"`
}

export function getTableFilteredData (this: any, item: any, column: any) {
  const self = this
  const hasData = (item: { [x: string]: { toString: () => string } }, column: string | number, self: { filterData: { [x: string]: string } }) => {
    const content = self.filterData[column]?.toLowerCase()
    return item[column]?.toString()?.toLowerCase()?.indexOf(content) === -1
  }

  const tableColumns = this.columns.map((column: { field: any }) => column.field)
  const tableData = this.data.filter((item: any) => {
    for (let i = 0; i < tableColumns.length; i++) {
      const column = tableColumns[i]
      if (self.filterData[column] === '') { continue }
      if (column in self.filterData && hasData(item, column, self)) {
        return false
      }
    }
    return true
  })
  return tableData
}

export function getTableFilteredValuesData (this: any) {
  const self = this
  const hasData = (item: { [x: string]: { toString: () => string } }, selectedItem: string | number, self: { getFilteredValuesData?: () => any; columnOptionsSelected?: any }) => {
    const content = item[selectedItem]?.toString()?.toLowerCase()
    return self.columnOptionsSelected[selectedItem]?.indexOf(content) == -1
  }
  this.columnOptionsSelected = Object.assign({}, this.columnOptionsSelected)
  const tableData = this.getFilteredData.filter((item: any) => {
    for (let i = 0; i < self.columns.length; i++) {
      const selectedItem = self.columns[i].field
      if (self.columnOptionsSelected[selectedItem].length == 0) { continue }
      if (hasData(item, selectedItem, self)) {
        return false
      }
    }
    return true
  })
  return tableData
}


