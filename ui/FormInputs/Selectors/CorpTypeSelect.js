import React from 'react'
import PropTypes from 'prop-types'

import { withTranslation } from 'react-i18next'
import Select from 'ui/FormInputs/Select'
import corporateTypeItems from 'ui/FormInputs/Select/Items/corporateType'

const CorpTypeSelect = (props) => (
  <Select
    items={corporateTypeItems}
    {...props}
  />
)

CorpTypeSelect.propTypes = {
  blankOption: PropTypes.bool,
}

CorpTypeSelect.defaultProps = {
  blankOption: false,
}

export default withTranslation()(CorpTypeSelect)
