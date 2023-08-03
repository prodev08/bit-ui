import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import expectedInvestmentItems from 'ui/FormInputs/Select/Items/expectedInvestment'

const ExpectedInvestmentSelect = (props) => (
  <Select
    items={expectedInvestmentItems}
    isTranslationDisabled
    {...props}
  />
)

ExpectedInvestmentSelect.propTypes = {
  blankOption: PropTypes.bool,
}

ExpectedInvestmentSelect.defaultProps = {
  blankOption: false,
}

export default ExpectedInvestmentSelect
