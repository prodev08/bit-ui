import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'

import items from './AuthenticityTypeSelect.items'

const AuthenticityTypeSelect = ({
  label, onChange, name, value,
}) => (
  <Select
    className='authenticity-type-select'
    label={label}
    items={items}
    name={name}
    onChange={onChange}
    value={value}
  />
)

AuthenticityTypeSelect.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
}

AuthenticityTypeSelect.defaultProps = {
  label: '',
  name: '',
  value: undefined,
}

export default AuthenticityTypeSelect
