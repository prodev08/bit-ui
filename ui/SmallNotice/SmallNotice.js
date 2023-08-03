import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Classes, Intent } from '@blueprintjs/core'

import Icons from 'icons'

const getIcon = (intent) => {
  switch (intent) {
    case Intent.PRIMARY:
    default:
      return Icons.ATTACHED_DOCUMENT
    case Intent.WARNING:
      return Icons.MAIL
    case Intent.DANGER:
      return Icons.EXCLAMATION_CIRCLE
  }
}

const SmallNotice = ({
  children, className, Icon, intent,
}) => {
  const classes = classNames('notice--small', className, Classes.intentClass(intent))
  const NoticeIcon = Icon || getIcon(intent)

  return (
    <div className={classes}>
      <NoticeIcon className='notice--small-icon' />
      <span>{children}</span>
    </div>
  )
}

SmallNotice.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  Icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  intent: PropTypes.string,
}

SmallNotice.defaultProps = {
  className: '',
  children: '',
  Icon: null,
  intent: Intent.PRIMARY,
}

export default SmallNotice
