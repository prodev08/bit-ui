import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Overlay } from '@blueprintjs/core'
import DialogHeader from './components/DialogHeader'

const Dialog = ({
  children, className, isCloseButtonShown, isHeaderShown, isOpen, onClose,
}) => {
  useEffect(() => {
    const className = 'overflow-hidden'

    if (isOpen) {
      document.body.classList.add(className)

      return () => document.body.classList.remove(className)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }
  return (
    <Overlay canOutsideClickClose={false} hasBackdrop={false} isOpen={isOpen}>
      <div className={classNames('fullscreen-dialog', className)}>
        {isHeaderShown && (
          <DialogHeader isCloseButtonShown={isCloseButtonShown} onClose={onClose} />
        )}
        {children}
      </div>
    </Overlay>
  )
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isCloseButtonShown: PropTypes.bool,
  isHeaderShown: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

Dialog.defaultProps = {
  children: null,
  className: '',
  isCloseButtonShown: true,
  isHeaderShown: true,
  isOpen: false,
  onClose: undefined,
}

export default Dialog
