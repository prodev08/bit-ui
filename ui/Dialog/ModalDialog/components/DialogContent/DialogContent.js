import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Classes } from '@blueprintjs/core'

const DialogContent = ({ className, children }) => {
  const classes = classNames('dialog-content', Classes.DIALOG_BODY, className)

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
