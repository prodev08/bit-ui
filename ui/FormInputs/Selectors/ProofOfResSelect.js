import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import proofOfResItems from 'ui/FormInputs/Select/Items/proofOfRes'

const ProofOfResSelect = (props) => (
  <Select items={proofOfResItems} {...props} />
)

ProofOfResSelect.propTypes = {
  blankOption: PropTypes.bool,
}

ProofOfResSelect.defaultProps = {
  blankOption: false,
}

export default ProofOfResSelect
