import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DialogControls = ({ className, children }) => {
  const classes = classNames('fullscreen-dialog-controls', className)

  return <div className={classes}>{children}</div>
}

DialogControls.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

DialogControls.defaultProps = {
  className: undefined,
}

export default DialogControls
