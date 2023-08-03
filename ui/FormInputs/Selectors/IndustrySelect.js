import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import getIndustryItems from 'ui/FormInputs/Select/Items/getIndustryItems'

const IndustrySelect = (props) => (
  <Select
    {...props}
    items={getIndustryItems()}
    isTranslationDisabled
  />
)

IndustrySelect.propTypes = {
  blankOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

IndustrySelect.defaultProps = {
  blankOption: false,
}

export default IndustrySelect
