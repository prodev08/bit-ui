import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import {
  WIZARD_TEXT_TYPE,
  WIZARD_TEXT_ALIGN,
} from './WizardText.constants'

const WizardText = ({
  text,
  type,
  align,
  className,
  children,
}) => {
  const { t } = useTranslation()

  const classes = classNames(
    'wizard-text',
    `wizard-text-${type}`,
    `wizard-text-${align}`,
    className,
  )

  const content = text ? t(text) : children

  return (
    <div className={classes}>
      {content}
    </div>
  )
}

WizardText.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf([
    WIZARD_TEXT_TYPE.TITLE,
    WIZARD_TEXT_TYPE.SMALL_TITLE,
    WIZARD_TEXT_TYPE.SUBTITLE,
    WIZARD_TEXT_TYPE.TEXT,
  ]),
  align: PropTypes.oneOf([
    WIZARD_TEXT_ALIGN.LEFT,
    WIZARD_TEXT_ALIGN.CENTER,
    WIZARD_TEXT_ALIGN.RIGHT,
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
}

WizardText.defaultProps = {
  text: undefined,
  type: WIZARD_TEXT_TYPE.TITLE,
  align: WIZARD_TEXT_ALIGN.CENTER,
  className: undefined,
  children: undefined,
}

export default WizardText
