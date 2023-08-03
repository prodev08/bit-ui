import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Menu } from '@blueprintjs/core'
import {
  Cell,
  Column,
  ColumnHeaderCell,
  CopyCellsMenuItem,
  Table,
} from '@blueprintjs/table'
import _isUndefined from 'lodash/isUndefined'
import _map from 'lodash/map'
import useAddToast from 'hooks/useAddToast'
import TOAST_TYPES from 'var/toastTypes'
import Tooltip from 'ui/Tooltip'

import {
  isSingleColumnSelected,
  isColumnNumeric,
  formatSumUpValue,
  getColumnWidths,
} from './DataTable.helpers'

const DataTable = ({
  cellStyle,
  className,
  columns,
  data,
  defaultSortDirection,
  headerUppercase,
  rowHeight,
  onSortChange,
  sortColumn: colSort,
  sortable,
}) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [sortColumn, setSortColumn] = useState(_isUndefined(colSort) ? 0 : colSort)
  const [sortAsc, setSortAsc] = useState(defaultSortDirection === 1)
  const [sumValue, setSumValue] = useState(null)
  const addToast = useAddToast()
  const containerRef = useRef(null)

  useEffect(() => {
    if (sumValue !== null) {
      const formattedSum = formatSumUpValue(sumValue)
      navigator.clipboard.writeText(formattedSum)
      addToast({
        type: TOAST_TYPES.SUCCESS,
        message: `Sum Up: ${formattedSum}`,
      })
      setSumValue(null)
    }
  }, [sumValue, addToast])

  const onScreenSizeChanged = () => {
    setContainerWidth(containerRef.current.offsetWidth)
  }

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth)
    window.addEventListener('resize', onScreenSizeChanged)

    return () => {
      window.removeEventListener('resize', onScreenSizeChanged)
    }
  }, [])

  const columnWidths = useMemo(
    () => getColumnWidths(columns, containerWidth),
    [columns, containerWidth],
  )

  const sortColumnChangeHandler = (columnIndex) => (e) => {
    const column = columns[columnIndex]
    if (!sortable || column.sortable === false) {
      return
    }

    const columnHeader = column.Header.toLowerCase()
    const { sortAccessor } = column

    const newSortDirection = columnIndex === sortColumn ? !sortAsc : true

    setSortColumn(columnIndex)
    setSortAsc(newSortDirection)

    onSortChange(columnIndex, columnHeader, newSortDirection, sortAccessor)

    e.preventDefault()
    e.stopPropagation()
  }

  const getCellRenderer = (accessor) => (rowIndex) => {
    const text = data[rowIndex][accessor]
    return (
      <Cell style={cellStyle}>
        <Tooltip
          wrapperTagName='div'
          targetTagName='div'
          content={text}
          position='bottom'
        >
          <div className='data-table-cell-content'>
            <span className='data-table-cell-text'>
              {text}
            </span>
          </div>
        </Tooltip>
      </Cell>
    )
  }

  const getHeaderCellRenderer = (colIndex) => {
    const column = columns[colIndex]
    return (
      <ColumnHeaderCell>
        <Tooltip
          wrapperTagName='div'
          targetTagName='div'
          content={column.tooltip}
          position='bottom'
        >
          <div className='data-table-header-content'>
            <span className='data-table-header-text'>{column.Header}</span>
            {column.tooltipIcon && (
              <i className='data-table-header-tooltip-icon fa fa-exclamation-circle info-icon' />
            )}
            {sortable && column.sortable !== false && (
              <i
                className={classNames('data-table-header-sort-icon fa', {
                  'fa-sort': sortColumn !== colIndex,
                  'fa-sort-up': sortColumn === colIndex && sortAsc,
                  'fa-sort-down': sortColumn === colIndex && !sortAsc,
                })}
                onClick={sortColumnChangeHandler(colIndex)}
              />
            )}
          </div>
        </Tooltip>
      </ColumnHeaderCell>
    )
  }

  const getCellValue = (row, col) => data[row][columns[col].accessor]

  const getBodyContextMenuRenderer = (context) => {
    const shouldShowSum = isSingleColumnSelected(context) && isColumnNumeric(context, columns)
    let sum = 0

    const getCellSum = (row, col) => {
      const { isNumeric } = columns[col]

      if (isNumeric) {
        const colValue = +getCellValue(row, col)
        sum += colValue
        setSumValue(sum)
      }
    }

    return (
      <Menu>
        <CopyCellsMenuItem
          text='Copy'
          context={context}
          getCellData={getCellValue}
        />
        {shouldShowSum && (
          <CopyCellsMenuItem
            text='Sum'
            context={context}
            getCellData={getCellSum}
          />
        )}
      </Menu>
    )
  }

  return (
    <div className='data-table-container' ref={containerRef}>
      <Table
        className={classNames('data-table', { 'header-uppercase': headerUppercase }, className)}
        numRows={data.length}
        defaultRowHeight={rowHeight}
        enableColumnResizing={false}
        enableRowHeader={false}
        columnWidths={columnWidths}
        getCellClipboardData={getCellValue}
        bodyContextMenuRenderer={getBodyContextMenuRenderer}
      >
        {_map(columns, ({ id, name, accessor }) => (
          <Column
            key={id}
            id={id}
            name={name}
            cellRenderer={getCellRenderer(accessor)}
            columnHeaderCellRenderer={getHeaderCellRenderer}
          />
        ))}
      </Table>
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,

  // header
  headerUppercase: PropTypes.bool,

  // row
  rowHeight: PropTypes.number,

  // table props
  sortable: PropTypes.bool, // if sorting UI is enabled
  sortColumn: PropTypes.number,
  defaultSortDirection: PropTypes.number,
  onSortChange: PropTypes.func,

  // cell props
  cellStyle: PropTypes.object,
}

DataTable.defaultProps = {
  className: '',

  headerUppercase: true,

  rowHeight: 40,

  sortable: true,
  sortColumn: undefined,
  defaultSortDirection: 1,
  onSortChange: () => {},

  cellStyle: {},
}

export default DataTable
