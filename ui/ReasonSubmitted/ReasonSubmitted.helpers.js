import _includes from 'lodash/includes'
import MANUAL_REASONS from './ReasonSubmitted.consts'

const getLabel = ({ manualReason, t }) => {
  if (
    _includes(
      [
        MANUAL_REASONS.AU10TIX_AUTHENTICITY,
        MANUAL_REASONS.AU10TIX_SELFIE,
        MANUAL_REASONS.AU10TIX_MISMATCH,
      ],
      manualReason,
    )
  ) {
    return t('reason_submitted_label.au10tix')
  }
  if (_includes([MANUAL_REASONS.WC_MATCH], manualReason)) {
    return t('reason_submitted_label.w_check')
  }
  if (
    _includes(
      [
        MANUAL_REASONS.PROHIBITED_AGE,
        MANUAL_REASONS.PROHIBITED_PERSON,
        MANUAL_REASONS.PROHIBITED_JURISDICTION,
      ],
      manualReason,
    )
  ) {
    return t('reason_submitted_label.prohibited')
  }
  if (_includes([MANUAL_REASONS.AU10TIX_NOT_SUPPORTED], manualReason)) {
    return t('reason_submitted_label.not_supp')
  }
}

export default getLabel
