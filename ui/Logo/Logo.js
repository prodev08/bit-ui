import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { THEME_TYPES } from 'var/themes'
import config from 'config'

const Logo = ({ className, theme }) => {
  const getClasses = () => {
    switch (theme) {
      case THEME_TYPES.MIDNIGHT:
      case THEME_TYPES.DARK:
      case THEME_TYPES.BLACK:
      default:
        return classNames('logo', 'logo--dark', className)
      case THEME_TYPES.LIGHT:
      case THEME_TYPES.COLOURBLIND:
        return classNames('logo', 'logo--light', className)
    }
  }

  const getSource = () => {
    switch (theme) {
      case THEME_TYPES.MIDNIGHT:
      case THEME_TYPES.DARK:
      case THEME_TYPES.BLACK:
      default:
        return `${config.assetsFolder}/logo-dark.svg`
      case THEME_TYPES.LIGHT:
        return `${config.assetsFolder}/logo-light.svg`
      case THEME_TYPES.COLOURBLIND:
        return `${config.assetsFolder}/logo-colourblind.svg`
    }
  }

  const classes = getClasses()
  const src = getSource()

  return (
    <img
      className={classes}
      src={src}
      title={config.platform}
      alt={config.platform}
    />
  )
}

Logo.propTypes = {
  theme: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Logo.defaultProps = {
  className: '',
}

export default Logo
