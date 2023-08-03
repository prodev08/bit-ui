import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DialogContent = ({ className, children }) => {
  const classes = classNames('fullscreen-dialog-content', className)

  return <div className={classes}>{children}</div>
}

DialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

DialogContent.defaultProps = {
  className: undefined,
}

export default DialogContent
