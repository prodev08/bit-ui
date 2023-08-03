import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tooltip from 'ui/Tooltip'

const IconTooltip = ({ children, className }) => {
  const classes = classNames('icon-tooltip', className)

  return (
    <Tooltip
      className={classes}
      content={children}
    >
      <i className='fa fa-question-circle link' />
    </Tooltip>
  )
}

IconTooltip.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

IconTooltip.defaultProps = {
  children: '',
  className: '',
}

export default IconTooltip
