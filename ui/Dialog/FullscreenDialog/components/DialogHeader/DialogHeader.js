import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Classes } from '@blueprintjs/core'
import Icons from 'icons'

import Button from 'ui/Button'

const DialogHeader = ({ className, isCloseButtonShown, onClose }) => {
  const classes = classNames('fullscreen-dialog-header', className)

  return (
    <div className={classes}>
      {isCloseButtonShown && (
        <Button
          className={classNames('fullscreen-dialog-back-btn', Classes.MINIMAL)}
          onClick={onClose}
        >
          <Icons.ARROW_LEFT />
        </Button>
      )}
    </div>
  )
}

DialogHeader.propTypes = {
  className: PropTypes.string,
  isCloseButtonShown: PropTypes.bool,
  onClose: PropTypes.func,
}

DialogHeader.defaultProps = {
  className: '',
  isCloseButtonShown: true,
  onClose: undefined,
}

export default DialogHeader
