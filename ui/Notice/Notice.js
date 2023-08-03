import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Notice = ({
  children, className, size, type,
}) => {
  const sizeClass = size && `notice--${size}`
  const typeClass = type && `notice--${type}`
  const classes = classNames('notice', typeClass, sizeClass, className)

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Notice.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  size: PropTypes.oneOf(['', 'small']),
  type: PropTypes.oneOf(['', 'green', 'red']),
}

Notice.defaultProps = {
  children: '',
  className: '',
  size: '',
  type: '',
}

export default Notice
