import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import occupationTypeItems from 'ui/FormInputs/Select/Items/occupationType'

const OccupationTypeSelect = (props) => (
  <Select
    {...props}
    items={occupationTypeItems}
  />
)

OccupationTypeSelect.propTypes = {
  blankOption: PropTypes.bool,
}

OccupationTypeSelect.defaultProps = {
  blankOption: false,
}

export default OccupationTypeSelect
