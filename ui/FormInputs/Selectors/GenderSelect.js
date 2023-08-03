import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import genderItems from 'ui/FormInputs/Select/Items/gender'

const GenderSelect = (props) => (
  <Select
    items={genderItems}
    {...props}
  />
)

GenderSelect.propTypes = {
  blankOption: PropTypes.bool,
}

GenderSelect.defaultProps = {
  blankOption: false,
}

export default GenderSelect
