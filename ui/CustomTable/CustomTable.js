import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import _isNull from 'lodash/isNull'
import _isObject from 'lodash/isObject'
import _isString from 'lodash/isString'
import _isUndefined from 'lodash/isUndefined'
import _map from 'lodash/map'

import Tooltip from 'ui/Tooltip'

const CustomTable = ({
  cellStyle,
  className,
  columns,
  data,
  defaultSortDirection,
  ExpandedComponent,
  expandable,
  expandedComponentProps,
  headerUppercase,
  isRowOnMouseOutEnabled,
  isRowOnRefEnabled,
  onExpand,
  onSortChange,
  rowClassName,
  rowKeyAccessor,
  rowOnMouseOut,
  rowOnRef,
  rowStyle,
  showHeader,
  small,
  sort,
  sortColumn: colSort,
  sortable,
  tableClassName,
  tableStyle,
}) => {
  const [sortColumn, setSortColumn] = useState(_isUndefined(colSort) ? 0 : colSort)
  const [sortAsc, setSortAsc] = useState(defaultSortDirection === 1)
  const [expandedRow, setExpandedRow] = useState(null)

  const getDataByAccessor = (entry, accessor) => {
    if (_isString(accessor)) {
      return entry[accessor]
    }
    if (_isFunction(accessor)) {
      return accessor(entry)
    }
    return ''
  }

  const defaultSort = (a, b) => {
    const column = columns[sortColumn]
    const columnAccessor = column.sortAccessor || column.accessor

    a = getDataByAccessor(a, columnAccessor)
    b = getDataByAccessor(b, columnAccessor)

    a = _isNull(a) || _isUndefined(a) ? '' : a
    b = _isNull(b) || _isUndefined(b) ? '' : b

    a = _isString(a) ? a.toLowerCase() : a
    b = _isString(b) ? b.toLowerCase() : b

    const equalityCheck = () => (a === b ? 1 : -1)

    if (sortAsc) {
      return a > b ? 1 : equalityCheck()
    }

    return a < b ? 1 : equalityCheck()
  }

  const sortColumnChangeHandler = (columnIndex) => {
    const column = columns[columnIndex]
    if (!sortable || column.sortable === false) {
      return
    }

    const columnHeader = column.Header.toLowerCase()
    const { sortAccessor } = column

    const newSortDirection = columnIndex === sortColumn ? !sortAsc : true

    setSortColumn(columnIndex)
    setSortAsc(newSortDirection)
    setExpandedRow(null)

    onSortChange(columnIndex, columnHeader, newSortDirection, sortAccessor)
  }

  const getHeader = (columns) => (
    <tr
      className={classNames('custom-table-head-tr', {
        uppercase: headerUppercase,
      })}
    >
      {_map(columns, (col, i) => (
        <th
          className='custom-table-head-tr-th'
          key={i}
          style={col.headerStyle}
          onClick={() => sortColumnChangeHandler(i)}
        >
          <Tooltip wrapperTagName='div' targetTagName='div' content={col.tooltip}>
            <span className='custom-table-head-tr-th-content'>
              {col.Header}
              {col.tooltipIcon && (
                <i className='custom-table-head-tr-th-tooltip-icon fa fa-exclamation-circle info-icon' />
              )}
              {sortable && col.sortable !== false && (
                <i
                  className={classNames('custom-table-head-tr-th-sort-icon fa', {
                    'fa-sort': sortColumn !== i,
                    'fa-sort-up': sortColumn === i && sortAsc,
                    'fa-sort-down': sortColumn === i && !sortAsc,
                  })}
                />
              )}
            </span>
          </Tooltip>
        </th>
      ))}
    </tr>
  )

  const getRowClassName = (entry, className) => {
    if (_isString(className)) {
      return className
    }
    if (_isFunction(className)) {
      return className(entry)
    }
    return ''
  }

  const getTooltip = ({ cellValue, column, entry }) => {
    if (column.tooltipAccessor) {
      return getDataByAccessor(entry, column.tooltipAccessor)
    }

    return _isObject(cellValue) ? '' : cellValue || ''
  }

  const getCell = (column, value) => {
    const { Cell } = column

    if (Cell) {
      return <Cell value={value} />
    }

    return value
  }

  const getCells = (columns, entry) => _map(columns, (col, i) => {
    const cellValue = getCell(col, getDataByAccessor(entry, col.accessor))

    const tooltip = getTooltip({ cellValue, column: col, entry })

    return (
      <td className='custom-table-body-tr-td' key={i} style={cellStyle}>
        <Tooltip
          content={tooltip === true ? 'true' : tooltip}
          hoverOpenDelay={250}
          wrapperTagName='div'
          targetTagName='div'
          className='custom-table-body-tr-td-tooltip'
          openOnTargetFocus={false}
        >
          <span>{cellValue}</span>
        </Tooltip>
      </td>
    )
  })

  const onRowClick = (rowIndex, entry) => {
    if (entry.onItemClick) {
      entry.onItemClick()
      return
    }
    if (!expandable) {
      return
    }

    const isOpen = expandedRow !== rowIndex

    onExpand({ index: rowIndex, isOpen })

    setExpandedRow(isOpen ? rowIndex : null)
  }

  const getExpandedRow = (expandedRowIndex, isExpanded) => {
    const expandedRowData = data[expandedRowIndex]

    return (
      <tr
        className={classNames('custom-table-body-tr--expandable', {
          'custom-table-body-tr--expandable--expanded': isExpanded,
        })}
      >
        <td className='custom-table-body-t--expandable-data' colSpan={columns.length}>
          <ExpandedComponent
            {...expandedComponentProps}
            data={expandedRowData}
            isExpanded={isExpanded}
          />
        </td>
      </tr>
    )
  }

  // eslint-disable-next-line max-len
  const getRowOnMouseOutHandler = (entry) => (isRowOnMouseOutEnabled(entry) ? rowOnMouseOut : undefined)

  const getRowOnRefHandler = (entry) => (isRowOnRefEnabled(entry) ? rowOnRef : undefined)

  const getTableData = () => {
    const sortedData = sort ? data.sort(defaultSort) : data

    return _map(sortedData, (entry, i) => (
      <React.Fragment key={(rowKeyAccessor && getDataByAccessor(entry, rowKeyAccessor)) || i}>
        <tr
          className={classNames(
            'custom-table-body-tr',
            {
              'custom-table-body-tr--expanded': expandable && expandedRow === i,
            },
            getRowClassName(entry, rowClassName),
          )}
          onClick={() => onRowClick(i, entry)}
          onBlur={getRowOnMouseOutHandler(entry)}
          onMouseOut={getRowOnMouseOutHandler(entry)}
          ref={getRowOnRefHandler(entry)}
          style={rowStyle}
        >
          {getCells(columns, entry)}
        </tr>
        {expandable && getExpandedRow(i, expandedRow === i)}
      </React.Fragment>
    ))
  }

  const classes = classNames('custom-table-wrapper', className, {
    'custom-table--small': small,
  })
  const headerClasses = classNames('custom-table-head', {
    'custom-table-head--disabled': !showHeader,
  })
  const tableData = getTableData()

  return (
    <div className={classes}>
      <table className={`custom-table ${tableClassName}`} style={tableStyle}>
        {showHeader && <thead className={headerClasses}>{getHeader(columns)}</thead>}
        <tbody>{tableData}</tbody>
      </table>
    </div>
  )
}

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  small: PropTypes.bool,

  // header
  showHeader: PropTypes.bool,
  headerUppercase: PropTypes.bool,

  // table props
  tableClassName: PropTypes.string,
  tableStyle: PropTypes.object,
  sortable: PropTypes.bool, // if sorting UI is enabled
  sort: PropTypes.bool, // should data be sorted internally
  sortColumn: PropTypes.number,
  defaultSortDirection: PropTypes.number,
  onSortChange: PropTypes.func,
  expandable: PropTypes.bool,
  ExpandedComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  expandedComponentProps: PropTypes.object,
  onExpand: PropTypes.func,

  // row props
  isRowOnMouseOutEnabled: PropTypes.func,
  isRowOnRefEnabled: PropTypes.func,
  rowStyle: PropTypes.object,
  rowKeyAccessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowOnMouseOut: PropTypes.func,
  rowOnRef: PropTypes.func,
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // cell props
  cellStyle: PropTypes.object,
}

CustomTable.defaultProps = {
  className: '',
  small: false,
  showHeader: true,
  headerUppercase: true,

  tableClassName: '',
  tableStyle: {},
  sortable: true,
  sort: false,
  sortColumn: undefined,
  defaultSortDirection: 1,
  onSortChange: () => {},
  expandable: false,
  ExpandedComponent: () => {},
  expandedComponentProps: {},
  onExpand: () => {},

  isRowOnMouseOutEnabled: () => false,
  isRowOnRefEnabled: () => false,
  rowStyle: {},
  rowKeyAccessor: '',
  rowOnMouseOut: () => {},
  rowOnRef: () => {},
  rowClassName: '',

  cellStyle: {},
}

export default memo(CustomTable)
