import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import documentTypeItems from 'ui/FormInputs/Select/Items/documentType'

const DocumentTypeSelect = (props) => (
  <Select
    items={documentTypeItems}
    {...props}
  />
)

DocumentTypeSelect.propTypes = {
  blankOption: PropTypes.bool,
}

DocumentTypeSelect.defaultProps = {
  blankOption: false,
}

export default DocumentTypeSelect
