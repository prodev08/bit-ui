import React from 'react'
import PropTypes from 'prop-types'
import { Dialog as BptDialog } from '@blueprintjs/core'
import classNames from 'classnames'

import DialogHeader from './components/DialogHeader'

const Dialog = ({
  children, className, isCloseButtonShown, isOpen, onClose, title, ...props
}) => (
  <BptDialog
    canOutsideClickClose={false}
    className={classNames(
      'dialog',
      { 'dialog_without-header': !(isCloseButtonShown || title) },
      className,
    )}
    isOpen={isOpen}
    {...props}
  >
    <DialogHeader isCloseButtonShown={isCloseButtonShown} onClose={onClose} title={title} />
    {children}
  </BptDialog>
)

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isCloseButtonShown: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
}

Dialog.defaultProps = {
  children: null,
  className: '',
  isCloseButtonShown: true,
  isOpen: false,
  onClose: undefined,
  title: undefined,
}

export default Dialog
