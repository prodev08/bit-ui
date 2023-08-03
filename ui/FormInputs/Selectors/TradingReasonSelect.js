import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import tradingReasonItems from 'ui/FormInputs/Select/Items/tradingReason'

const TradingReasonSelect = (props) => (
  <Select items={tradingReasonItems} {...props} />
)

TradingReasonSelect.propTypes = {
  blankOption: PropTypes.bool,
}

TradingReasonSelect.defaultProps = {
  blankOption: false,
}

export default TradingReasonSelect
