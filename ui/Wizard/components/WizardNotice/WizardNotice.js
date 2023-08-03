import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import {
  WIZARD_NOTICE_SIZE,
  WIZARD_NOTICE_INTENT,
} from './WizardNotice.constants'

const WizardNotice = ({
  icon,
  text,
  size,
  intent,
  fullWidth,
  placeOutside,
  className,
  children,
}) => {
  const { t } = useTranslation()

  const classes = classNames(
    'wizard-notice',
    `wizard-notice-${size}`,
    `wizard-notice-${intent}`,
    {
      'wizard-notice-full-width': fullWidth,
      'wizard-notice-place-outside': placeOutside,
    },
    className,
  )

  const content = text ? t(text) : children

  return (
    <div className={classes}>
      {icon}
      {content}
    </div>
  )
}

WizardNotice.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  size: PropTypes.oneOf([
    WIZARD_NOTICE_SIZE.NORMAL,
    WIZARD_NOTICE_SIZE.SMALL,
  ]),
  intent: PropTypes.oneOf([
    WIZARD_NOTICE_INTENT.INFO,
    WIZARD_NOTICE_INTENT.SUCCESS,
    WIZARD_NOTICE_INTENT.WARNING,
  ]),
  fullWidth: PropTypes.bool,
  placeOutside: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

WizardNotice.defaultProps = {
  icon: undefined,
  text: undefined,
  size: WIZARD_NOTICE_SIZE.NORMAL,
  intent: WIZARD_NOTICE_INTENT.INFO,
  fullWidth: false,
  placeOutside: false,
  className: undefined,
  children: undefined,
}

export default WizardNotice
