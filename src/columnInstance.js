import * as React from 'react'

const noob = () => null
const defaultHeader = noob
const defaultCell = noob
// const defaultFilter = noob

export const columnInstance = ({Header, ...rest}) => {
  return {
    ...rest,
    getHeaderProps: () => {
      return {}
    },
    renderHeader: () => {
      console.log('renderHeader')
      if (typeof Header === 'string' || React.isValidElement(Header)) {
        return Header
      } else if (Header instanceof Function) {
        return Header()
      }
      return defaultHeader
    }
  }
}

export const rowInstance = (row, columnsInstances) => {
  return {
    getRowProps: () => {
      return {}
    },
    cells: columnsInstances.map(({selector, cell}, cellIdx) => {
      const tableCell = {
        original: row,
        value: null
      }

      let defaultRender = ({value}) => value
      let renderCell = defaultRender
      if (row.hasOwnProperty(selector)) {
        tableCell.value = row[selector]
      }
      if (typeof cell === 'function') {
        renderCell = () => cell(tableCell)
      } else {
        renderCell = () => defaultRender(tableCell)
      }
      return {
        getCellProps: () => {
          return {}
        },
        render: renderCell,
        ...tableCell
      }
    })
  }
}
