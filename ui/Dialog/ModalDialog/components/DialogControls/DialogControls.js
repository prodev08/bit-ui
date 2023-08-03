import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Classes } from '@blueprintjs/core'

const DialogControls = ({ className, children }) => {
  const classes = classNames('dialog-controls', Classes.DIALOG_FOOTER, className)

  return (
    <div className={classes}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>{children}</div>
    </div>
  )
}

DialogControls.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

DialogControls.defaultProps = {
  className: undefined,
}

export default DialogControls
