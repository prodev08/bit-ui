import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const PDF = ({ className, src }) => {
  const classes = classNames('pdf', className)

  return (
    <embed
      src={src}
      className={classes}
      width='850'
      height='700'
    />
  )
}

PDF.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
}

PDF.defaultProps = {
  className: '',
}

export default memo(PDF)
