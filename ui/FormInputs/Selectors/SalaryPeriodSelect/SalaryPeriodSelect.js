import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'

import items from './SalaryPeriodSelect.items'

const SalaryPeriodSelect = (props) => (
  <Select
    items={items}
    {...props}
  />
)

SalaryPeriodSelect.propTypes = {
  blankOption: PropTypes.bool,
}

SalaryPeriodSelect.defaultProps = {
  blankOption: false,
}

export default SalaryPeriodSelect
