import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'

import items from './IdentityDocumentTypeSelect.items'

const IdentityDocumentTypeSelect = ({
  label, name, onChange, value,
}) => (
  <Select
    className='identity-type-select'
    label={label}
    items={items}
    name={name}
    onChange={onChange}
    value={value}
  />
)

IdentityDocumentTypeSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

IdentityDocumentTypeSelect.defaultProps = {
  label: '',
  name: '',
  value: undefined,
}

export default IdentityDocumentTypeSelect
