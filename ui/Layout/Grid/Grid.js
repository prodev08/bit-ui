import React from 'react'
import PropTypes from 'prop-types'

import Row from '../Row'
import Cell from '../Cell'

const Grid = ({
  data,
  customCellStylesByRow,
  customCellStylesByCol,
}) => {
  const getCellClassName = (row, col) => {
    if (customCellStylesByRow && customCellStylesByRow[row]) {
      return customCellStylesByRow[row]
    }

    if (customCellStylesByCol && customCellStylesByCol[col]) {
      return customCellStylesByCol[col]
    }

    return `l${(col % 2) ? 4 : 2} m${(col % 2) ? 4 : 2} s12`
  }

  return (
    <div className='grid'>
      {
        data.filter((row) => row).map((row, i) => (
          <Row key={i}>
            {
              row.map((data, j) => (
                <Cell className={getCellClassName(i, j)} key={j}>
                  {data}
                </Cell>
              ))
            }
          </Row>
        ))
      }
    </div>
  )
}

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  customCellStylesByRow: PropTypes.object,
  customCellStylesByCol: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

Grid.defaultProps = {
  customCellStylesByRow: null,
  customCellStylesByCol: null,
}

export default Grid
