import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Classes } from '@blueprintjs/core'
import Icons from 'icons'

import Button from 'ui/Button'

const DialogHeader = ({
  className, isCloseButtonShown, onClose, title,
}) => {
  const classes = classNames(
    'dialog-header',
    Classes.DIALOG_HEADER,
    {
      'dialog-header_with-close-btn': isCloseButtonShown,
      'dialog-header_without-title': !title,
    },
    className,
  )

  return (
    <div className={classes}>
      {!!title && (
      <div className={classNames('dialog-heading', Classes.HEADING)}>
        {title}
      </div>
      )}
      {isCloseButtonShown && (
        <Button
          className={classNames(Classes.DIALOG_CLOSE_BUTTON, Classes.MINIMAL)}
          onClick={onClose}
        >
          <Icons.CROSS />
        </Button>
      )}
    </div>
  )
}

DialogHeader.propTypes = {
  className: PropTypes.string,
  isCloseButtonShown: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
}

DialogHeader.defaultProps = {
  className: '',
  isCloseButtonShown: true,
  onClose: undefined,
  title: undefined,
}

export default DialogHeader
