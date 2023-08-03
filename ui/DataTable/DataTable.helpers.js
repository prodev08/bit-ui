import _get from 'lodash/get'
import _map from 'lodash/map'

export const isSingleColumnSelected = (context) => _get(context, 'selectedRegions[0].cols[0]')
  === _get(context, 'selectedRegions[0].cols[1]')

export const isColumnNumeric = (context, columns) => {
  const columnIndex = _get(context, 'selectedRegions[0].cols[0]')
  return columns?.[columnIndex]?.isNumeric ?? false
}

export const formatSumUpValue = (value) => {
  if (value === 0) return '0'
  return parseFloat(value).toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const getColumnWidths = (columns, containerWidth) => {
  if (columns.length === 0) {
    return []
  }

  const innerWidth = containerWidth - 2 // for border
  const avgWidth = Math.floor(innerWidth / columns.length)
  const minWidth = 100
  if (avgWidth < minWidth) {
    return _map(columns, () => minWidth)
  }

  const columnWidths = _map(columns, () => avgWidth)
  columnWidths[0] = innerWidth - ((columns.length - 1) * avgWidth)

  return columnWidths
}
