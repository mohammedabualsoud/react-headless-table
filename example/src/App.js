import React, { Component } from 'react'

import HeadlessTable from 'react-headless-table'
import {
  Table,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css'

const Hero = (props) => {
  return <h1>Hero</h1>
}

export const SUPPORTED_FIELDS_COLUMNS = [
  {
    Header: () =>
      <div>
        <div>Field Name</div>
        <div>(match in PDF form)</div>
      </div>,
    selector: 'field',
    // cell: (row) => {
    //     console.log('with selector row', row)
    //     return <p>row</p>
    // },
    headerClassName: 'w-25'
  },
  {
    Header: <Hero />,
    selector: 'description',
    // cell: (row) => {
    //   console.log('with out selector row', row)
    //   return <p>{row.value}</p>
    // },
    headerClassName: 'w-50'
  },
  {
    Header: Hero,
    selector: 'defaultValue',
    headerClassName: 'w-25'
  },
];

const data = [
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
  {
    field: 'field value',
    description: 'description value',
    defaultValue: 'defaultValue value'

  },
];

export default class App extends Component {
  render () {
    return (
      <div>
        <HeadlessTable
          data={data}
          columns={SUPPORTED_FIELDS_COLUMNS}
          render={({data, columns}, {columnsInstances, rowsInstances}) => {
            console.log(columnsInstances);
            return (
              <Table responsive dark>
                <thead>
                  <tr>
                    {columnsInstances.map((column, columnIdx) => {
                      return (
                        <th {...column.getColumnProps} key={columnIdx}>
                          {column.renderHeader()}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowsInstances.map(
                    (row, i) =>
                      (
                        <tr {...row.getRowProps()} key={'row'+i}
                        >
                          {row.cells && row.cells.map((cell, cellIdx) => {
                            return (
                              <td {...cell.getCellProps()} key={'cell' + cellIdx}>{cell.render()}</td>
                            )
                          })}
                        </tr>
                      )
                  )}
                </tbody>

              </Table>
            )
          }} />
      </div>
    )
  }
}
