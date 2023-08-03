import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import Select from 'ui/FormInputs/Select'
import disabledOption from 'ui/FormInputs/Select/Items/disabledOption'
import {
  BUSINESS_TYPES_OPTIONS,
  COMPLIANCE_BUSINESS_TYPES,
  COMPLIANCE_BUSINESS_TYPES_OPTIONS,
} from 'var/forms/businessTypes'

const BusinessTypeSelect = (props) => {
  const { isCompliance, t, ...selectProps } = props
  const value = _get(selectProps, ['input', 'value'])

  const showOldSelect = !isCompliance && COMPLIANCE_BUSINESS_TYPES.includes(value)

  const items = [...BUSINESS_TYPES_OPTIONS()]
  if (isCompliance) {
    items.push(disabledOption)
    items.push(...COMPLIANCE_BUSINESS_TYPES_OPTIONS())
  }
  if (showOldSelect) {
    items.push(disabledOption)
    items.push({ value, label: t(`business_types.${value}`) })
  }

  return (
    <Select
      items={items}
      isTranslationDisabled
      {...selectProps}
    />
  )
}

BusinessTypeSelect.propTypes = {
  blankOption: PropTypes.bool,
  isCompliance: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

BusinessTypeSelect.defaultProps = {
  blankOption: false,
}

export default BusinessTypeSelect
