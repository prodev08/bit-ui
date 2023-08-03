import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import _values from 'lodash/values'
import {
  AnchorButton, Button as BptButton, Classes, Intent,
} from '@blueprintjs/core'

import { BUTTON_COMPONENT_TYPES, BUTTON_SIZES, BUTTON_TYPES } from './Button.consts'

const getIntentClass = (type) => {
  switch (type) {
    case Intent.DANGER:
      return Classes.INTENT_DANGER
    case Intent.PRIMARY:
      return Classes.INTENT_PRIMARY
    case Intent.SUCCESS:
      return Classes.INTENT_SUCCESS
    case Intent.WARNING:
      return Classes.INTENT_WARNING
    default:
      return ''
  }
}

const Button = ({
  autoFocus,
  children,
  className,
  componentType,
  disabled,
  elementRef,
  loading,
  onClick,
  size,
  type,
  minimal,
  to,
  ...otherProps
}) => {
  const intentClass = getIntentClass(type)
  const sizeClass = size && `${Classes.BUTTON}--${size}`

  const classes = classNames(intentClass, sizeClass, className)

  if (componentType === BUTTON_COMPONENT_TYPES.LINK) {
    return (
      <Link
        className={classNames(classes, Classes.BUTTON)}
        to={to}
      >
        {children}
      </Link>
    )
  }

  // AnchorButton allows hover when nested inside tooltip
  const ButtonComponent = componentType === BUTTON_COMPONENT_TYPES.ANCHOR ? AnchorButton : BptButton

  return (
    <ButtonComponent
      autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      className={classes}
      disabled={disabled}
      loading={loading}
      minimal={minimal}
      onClick={onClick}
      ref={elementRef}
      {...otherProps}
    >
      {children}
    </ButtonComponent>
  )
}

Button.propTypes = {
  autoFocus: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  componentType: PropTypes.oneOf(_values(BUTTON_COMPONENT_TYPES)),
  disabled: PropTypes.bool,
  elementRef: PropTypes.object,
  loading: PropTypes.bool,
  minimal: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(_values(BUTTON_SIZES)),
  to: PropTypes.string,
  type: PropTypes.oneOf(_values(BUTTON_TYPES)),
}

Button.defaultProps = {
  autoFocus: undefined,
  children: '',
  className: '',
  componentType: BUTTON_COMPONENT_TYPES.BUTTON,
  disabled: false,
  elementRef: null,
  loading: undefined,
  minimal: false,
  onClick: undefined,
  size: undefined,
  to: undefined,
  type: undefined,
}

export default Button
