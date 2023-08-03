import React, { memo } from 'react'
import classNames from 'classnames'

import { propTypes, defaultProps } from './Video.props'

const Video = ({ src, className }) => {
  const classes = classNames('video', className)

  return (
    <video
      className={classes}
      controls
      autoPlay
      preload='none'
      width='600'
    >
      <source src={src} />
    </video>
  )
}

Video.propTypes = propTypes

Video.defaultProps = defaultProps

export default memo(Video)
