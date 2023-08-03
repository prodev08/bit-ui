import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import _includes from 'lodash/includes'
import _values from 'lodash/values'

import MANUAL_REASONS from './ReasonSubmitted.consts'
import getLabel from './ReasonSubmitted.helpers'

const ReasonSubmitted = ({ manualReason, shouldShowAuthenticityWord }) => {
  const { t } = useTranslation('compliance')

  if (!manualReason) {
    return null
  }

  const classes = classNames('reason-submitted', {
    'reason-submitted-red': _includes(
      [
        MANUAL_REASONS.AU10TIX_AUTHENTICITY,
        MANUAL_REASONS.AU10TIX_SELFIE,
        MANUAL_REASONS.AU10TIX_MISMATCH,
      ],
      manualReason,
    ),
    'reason-submitted-yellow': _includes([MANUAL_REASONS.WC_MATCH], manualReason),
    'reason-submitted-orange': _includes(
      [
        MANUAL_REASONS.PROHIBITED_AGE,
        MANUAL_REASONS.PROHIBITED_PERSON,
        MANUAL_REASONS.PROHIBITED_JURISDICTION,
      ],
      manualReason,
    ),
    'reason-submitted-grey': _includes([MANUAL_REASONS.AU10TIX_NOT_SUPPORTED], manualReason),
  })

  return (
    <div className={classes}>{`${getLabel({ manualReason, t })}${
      shouldShowAuthenticityWord ? ` ${t('authenticity_lower')}` : ''
    }`}
    </div>
  )
}

ReasonSubmitted.propTypes = {
  manualReason: PropTypes.oneOf(_values(MANUAL_REASONS)),
  shouldShowAuthenticityWord: PropTypes.bool,
}

ReasonSubmitted.defaultProps = {
  manualReason: undefined,
  shouldShowAuthenticityWord: false,
}

export default ReasonSubmitted
