import React from 'react'
import PropTypes from 'prop-types'
import {columnInstance, rowInstance} from './columnInstance'
import paginate from './paginate'

export default class HeadlessTable extends React.Component {

  static propTypes = {
    withPagination: PropTypes.bool,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        selector: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
        ]),
        show: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.func,
        ]),
        Header: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
          PropTypes.node,
        ]),
        Cell: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.node,
        ]),
        filterable: PropTypes.bool,
        filter: PropTypes.oneOfType([ // filter type name or function
          PropTypes.string,
          PropTypes.func,
        ]), // Filter to use either a  string refer to the supported filters, or custom one.
        FilterUi: PropTypes.node,
        sortable: PropTypes.bool,
        sort: PropTypes.func,
        width: PropTypes.string,
        minWidth: PropTypes.string,
        maxWidth: PropTypes.string,
        columns: PropTypes.array // nested group headers
      })
    ), // columns Definition
    data: PropTypes.array,
    render: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    maxPage: PropTypes.number,
  };

  static defaultProps = {
    withPagination: true,
    pageSize: 5,
    maxPage: 3
  }

  state = {
    rowsInstances: [], // rows instances used for rendering purpose as helpers for the users
    columnsInstances: [], // columns instances used for rendering purpose as helpers for the users
    filters: [], // applied filters, {filter:<type>| method, value: selected value}
    preFilteredRows: [],
    rows: [], // visible rows to show/
    pagination: {
      currentPage: 1
    }
  };

  createRowsInstances = (rows, columnsInstances) => {
    const rowsInstances = rows.map((row) => rowInstance(row, columnsInstances))
    // Might need to clone rowsInstances into rows, for now it's ok, since we don't modify the rows.
    this.setState({rowsInstances, rows: rowsInstances})
    return rowsInstances
  };

  createColumnsInstances = (columns) => {
    const columnsInstances = columns.map(columnInstance)
    this.setState({columnsInstances})
    return columnsInstances
  };

  changePage = (page) => {
    this.setState({currentPage: page}, () => {
      this.computePagination(this.state.rowsInstances)
    })
  }

  computePagination = (rowsInstances) => {
    const {
      pageSize,
      maxPage
    } = this.props
    const {currentPage} = this.state
    const pagination = paginate(rowsInstances.length, currentPage, pageSize, maxPage)
    this.setState({pagination, rows: rowsInstances.slice(pagination.startIndex, pagination.endIndex)})
  };

  init = () => {
    // init the table data.
    const {data, columns, withPagination} = this.props
    const columnsInstances = this.createColumnsInstances(columns)
    const rowsInstances = this.createRowsInstances(data, columnsInstances)
    // if to support pagination
    if (withPagination) {
      // generate pagination methods, and state.
      this.computePagination(rowsInstances)
    }
  };

  componentDidMount() {
    this.init()
  }

  render() {
    const {render} = this.props
    return (
      render({...this.state, gotoPage: this.changePage})
    )
  }
}
