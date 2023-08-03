import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Navbar = ({ children, className }) => {
  const classes = classNames('navbar', className)

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Navbar.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

Navbar.defaultProps = {
  className: '',
}

export default memo(Navbar)
