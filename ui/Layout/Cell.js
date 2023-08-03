import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ children, className }) => (
  <div className={`col ${className || ''}`}>
    {children}
  </div>
)

Cell.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

Cell.defaultProps = {
  children: '',
  className: '',
}

export default Cell
