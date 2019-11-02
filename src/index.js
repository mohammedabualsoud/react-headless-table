import React from 'react'
import PropTypes from 'prop-types'
import {columnInstance, rowInstance} from './columnInstance'

export default class HeadlessTable extends React.Component {

  static propTypes = {
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
    render: PropTypes.func.isRequired
  };

  state = {
    rowsInstances: [], // rows instances used for rendering purpose as helpers for the users
    columnsInstances: [], // columns instances used for rendering purpose as helpers for the users
    filters: [], // applied filters, {filter:<type>| method, value: selected value}
    preFilteredRows: [],
    visibleRows: [],
    pagingInfo: {}
  };

  createRowsInstances = (rows, columnsInstances) => {
    this.setState({rowsInstances: rows.map((row) => rowInstance(row, columnsInstances))})
  };

  createColumnsInstances = (columns) => {
    const columnsInstances = columns.map(columnInstance)
    this.setState({columnsInstances})
    return columnsInstances
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
    const {data, columns, render} = this.props
    return (
      render({data, columns}, this.state)
    )
  }
}
