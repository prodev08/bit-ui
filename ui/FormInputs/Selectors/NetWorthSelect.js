import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import netWorthItems from 'ui/FormInputs/Select/Items/netWorth'

const NetWorthSelect = (props) => (
  <Select
    items={netWorthItems}
    isTranslationDisabled
    {...props}
  />
)

NetWorthSelect.propTypes = {
  blankOption: PropTypes.bool,
}

NetWorthSelect.defaultProps = {
  blankOption: false,
}

export default NetWorthSelect
