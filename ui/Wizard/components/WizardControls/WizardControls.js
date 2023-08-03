import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import Button from 'ui/Button'

const WizardControls = ({
  backText,
  continueText,
  translateText,
  isBackDisabled,
  isBackHidden,
  isContinueDisabled,
  isContinueHidden,
  onContinue,
  onBack,
  className,
}) => {
  const { t } = useTranslation()

  const classes = classNames(
    'wizard-controls',
    className,
  )

  return (
    <div className={classes}>
      {!isBackHidden && (
        <Button
          type='primary'
          onClick={onBack}
          disabled={isBackDisabled}
          minimal
        >
          {translateText ? t(backText) : backText}
        </Button>
      )}
      {!isContinueHidden && (
        <Button
          type='success'
          onClick={onContinue}
          disabled={isContinueDisabled}
        >
          {translateText ? t(continueText) : continueText}
        </Button>
      )}
    </div>
  )
}

WizardControls.propTypes = {
  backText: PropTypes.node,
  continueText: PropTypes.node,
  translateText: PropTypes.bool,
  isBackDisabled: PropTypes.bool,
  isBackHidden: PropTypes.bool,
  isContinueDisabled: PropTypes.bool,
  isContinueHidden: PropTypes.bool,
  onBack: PropTypes.func,
  onContinue: PropTypes.func,
  className: PropTypes.string,
}

WizardControls.defaultProps = {
  backText: 'go_back',
  continueText: 'continue',
  translateText: true,
  isBackDisabled: false,
  isBackHidden: false,
  isContinueDisabled: false,
  isContinueHidden: false,
  onBack: () => { },
  onContinue: () => { },
  className: undefined,
}

export default WizardControls
