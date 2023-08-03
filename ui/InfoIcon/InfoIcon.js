import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tooltip from 'ui/Tooltip'

const InfoIcon = ({ children, className }) => {
  const classes = classNames('info-icon', className)

  return (
    <Tooltip
      className={classes}
      content={children}
    >
      <i className='fa fa-exclamation-circle info-icon clickable' />
    </Tooltip>
  )
}

InfoIcon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

InfoIcon.defaultProps = {
  children: '',
  className: '',
}

export default InfoIcon
