import React, { Component } from 'react'
import faker from 'faker'

import HeadlessTable from 'react-headless-table'
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'

const Hero = (props) => {
  return <div>
    <h1 className='text-primary'>Custom Header</h1>
    <Button onClick={() => window.alert('Custom action')}> Click Here</Button>
  </div>
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
    Header: 'Demo Value',
    selector: 'defaultValue',
    headerClassName: 'w-25'
  },
];

const data = Array(100)
  .fill(1)
  .map(i => {
    return {
      field: faker.address.city(),
      description: faker.name.lastName(),
      defaultValue: faker.random.number()

    }
  })

export default class App extends Component {
  render () {
    return (
      <div>
        <HeadlessTable
          withPagination={false}
          maxPage={5}
          data={data}
          columns={SUPPORTED_FIELDS_COLUMNS}
          render={({columnsInstances, rows, pagination, gotoPage}) => {
            const {
              pages,
              currentPage,
              totalPages
            } = pagination

            return (
              <React.Fragment>
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
                    {rows.map(
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
                {/*
                Pagination can be built however you'd like.
                This is just a very basic UI implementation:
                */}
                {pages && pages.length > 1 &&
                <div className="p-1 p-sm-3 text-right">
                  <Pagination  size="sm"  aria-label="Page navigation example" className="float-right">
                    {pages.map(pageNumber => {
                      return (
                        <PaginationItem  key={pageNumber} active={pageNumber === currentPage}>
                          <PaginationLink onClick={() => gotoPage(pageNumber)}>
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })
                    }
                  </Pagination>
                  <div className="clearfix"/>
                  <div>
                    Page{' '}
                    <strong>
                      {currentPage} of {totalPages}
                    </strong>{' '}
                  </div>
                </div>
              }
              </React.Fragment>

            )
          }} />
      </div>
    )
  }
}
