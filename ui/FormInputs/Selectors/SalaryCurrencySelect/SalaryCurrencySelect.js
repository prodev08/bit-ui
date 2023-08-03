import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'

import items from './SalaryCurrencySelect.items'

const SalaryCurrencySelect = (props) => (
  <Select
    items={items}
    isTranslationDisabled
    {...props}
  />
)

SalaryCurrencySelect.propTypes = {
  blankOption: PropTypes.bool,
}

SalaryCurrencySelect.defaultProps = {
  blankOption: false,
}

export default SalaryCurrencySelect
