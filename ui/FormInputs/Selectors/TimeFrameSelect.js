import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import timeFrameItems from 'ui/FormInputs/Select/Items/timeFrame'

const TimeFrameSelect = (props) => (
  <Select items={timeFrameItems} {...props} />
)

TimeFrameSelect.propTypes = {
  blankOption: PropTypes.bool,
}

TimeFrameSelect.defaultProps = {
  blankOption: false,
}

export default TimeFrameSelect
