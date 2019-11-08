import * as React from 'react'

// Sorting.
import * as sortTypes from './sortTypes'

const noob = () => null

const defaultColumnProps = {
  sortable: true,
  sort: 'alphanumeric',
  Header: noob
}

export const columnInstance = (column, columnId, toggleSortBy) => {
  const columnProps = {...defaultColumnProps, ...column}
  console.log('columnProps', columnProps)
  if (columnProps.sortable) {
    let sort = null
    if (typeof columnProps.sort === 'function') {
      sort = columnProps.sort
    } else if (typeof columnProps.sort === 'string') {
      sort = sortTypes[columnProps.sort]
      if (!sort) {
        throw new Error(`Column ${columnId + 1}: ${columnProps.sort} sort method isn't supported, you can add provide your sort func to the sort prop`)
      }
    } else {
      throw new Error(`Column ${columnId + 1}: sort prop must be function or string`)
    }
    columnProps.sort = sort
  }

  return {
    ...columnProps,
    getSortProps: (props) => ({
      onClick: columnProps.sortable
        ? e => {
          // e.persist()
          toggleSortBy(columnId)
        }
        : undefined,
      style: {
        cursor: columnProps.sortable ? 'pointer' : undefined
      },
      title: 'Toggle SortBy',
      ...props
    }),
    getColumnProps: (props) => {
      return {...props}
    },
    renderHeader: () => {
      const { Header } = columnProps
      console.log('renderHeader')
      if (typeof Header === 'string' || React.isValidElement(Header)) {
        return Header
      } else if (Header instanceof Function) {
        return Header()
      }
    }
  }
}

export const rowInstance = (row, columnsInstances, rowIndex) => {
  const values = []
  return {
    index: rowIndex,
    values,
    getRowProps: (props = {}) => {
      return {...props}
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
      values.push(tableCell.value)
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
