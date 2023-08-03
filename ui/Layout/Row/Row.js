import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Row = ({ children, className }) => (
  <div className={classNames('row', className)}>
    {children}
  </div>
)

Row.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

Row.defaultProps = {
  className: '',
}

export default Row
