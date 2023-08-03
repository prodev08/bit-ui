import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import bankDetailsItems from 'ui/FormInputs/Select/Items/bankDetails'

const BankDetailsSelect = (props) => (
  <Select items={bankDetailsItems} {...props} />
)

BankDetailsSelect.propTypes = {
  blankOption: PropTypes.bool,
}

BankDetailsSelect.defaultProps = {
  blankOption: false,
}

export default BankDetailsSelect
