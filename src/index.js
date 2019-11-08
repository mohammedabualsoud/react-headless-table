import React from 'react'
import PropTypes from 'prop-types'
import {columnInstance, rowInstance} from './columnInstance'
import paginate from './paginate'
import {defaultOrderByFn} from './utils'

export default class HeadlessTable extends React.Component {

  static propTypes = {
    withPagination: PropTypes.bool,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        selector: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func
        ]),
        show: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.func
        ]),
        Header: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
          PropTypes.node
        ]),
        Cell: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.node
        ]),
        filterable: PropTypes.bool,
        filter: PropTypes.oneOfType([ // filter type name or function
          PropTypes.string,
          PropTypes.func
        ]), // Filter to use either a  string refer to the supported filters, or custom one.
        FilterUi: PropTypes.node,
        sortable: PropTypes.bool,
        sortType: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func
        ]),
        width: PropTypes.string,
        minWidth: PropTypes.string,
        maxWidth: PropTypes.string,
        columns: PropTypes.array // nested group headers
      })
    ), // columns Definition
    data: PropTypes.array,
    render: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    maxPage: PropTypes.number
  };

  static defaultProps = {
    withPagination: true,
    pageSize: 5,
    maxPage: 3
  }

  state = {
    rowsInstances: [], // rows instances used for processing like sorting, flitering.
    columnsInstances: [], // columns instances used for rendering purpose as helpers for the users
    filters: [], // applied filters, {filter:<type>| method, value: selected value}
    preFilteredRows: [],
    appliedColumnSorting: {
      columnsId: null,
      desc: null
    }, //
    rows: [], // visible rows to show.
    activePage: [], // Current active page to show
    pagination: {
      currentPage: 1
    }
  };

  createRowsInstances = (rows, columnsInstances) => {
    const rowsInstances = rows.map((row, rowIdx) => rowInstance(row, columnsInstances, rowIdx))
    // Might need to clone rowsInstances into rows, for now it's ok, since we don't modify the rows.
    this.setState({rowsInstances, rows: rowsInstances})
    return rowsInstances
  };

  createColumnsInstances = (columns) => {
    const columnsInstances = columns.map((columns, columnId) => columnInstance(columns, columnId, this.toggleSort))
    this.setState({columnsInstances})
    return columnsInstances
  };

  // Sorting
  toggleSort = (targetColumnId) => {
    // calculate the sorting state.
    this.setState(({appliedColumnSorting: {desc, columnId}}) => {
      let isDescending = desc
      if (targetColumnId !== columnId) {
        isDescending = null
      }
      isDescending = ((isDescending === null) ? true : ((isDescending === true) ? false : null))
      return {
        appliedColumnSorting: {
          columnId: targetColumnId,
          desc: isDescending
        }
      }
    }, () => {
      this.calculateSortedRows(targetColumnId)
    })
  };

  calculateSortedRows = (columnId) => {
    const {columnsInstances, rowsInstances, appliedColumnSorting: {desc}} = this.state
    const columnInstance = columnsInstances[columnId]
    if (columnInstance.sortable && typeof desc === 'boolean') {
      const sortedRows = defaultOrderByFn([...rowsInstances], columnInstance.sort, desc, columnId)
      this.setState({rows: sortedRows})
    } else {
      // reset
      return this.setState({rows: rowsInstances})
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.rows !== this.state.rows) {
      // if to support pagination
      if (this.props.withPagination) {
        // generate pagination methods, and state.
        this.computePagination()
      }
    }
  }

  // Pagineation
  changePage = (page) => {
    this.setState({currentPage: page}, () => {
      this.computePagination(this.state.rowsInstances)
    })
  };

  computePagination = () => {
    const {
      pageSize,
      maxPage
    } = this.props
    const {currentPage, rows} = this.state
    const pagination = paginate(rows.length, currentPage, pageSize, maxPage)
    this.setState({pagination, activePage: rows.slice(pagination.startIndex, pagination.endIndex)})
  };

  init = () => {
    // init the table data.
    const {data, columns} = this.props
    const columnsInstances = this.createColumnsInstances(columns)
    this.createRowsInstances(data, columnsInstances)
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
