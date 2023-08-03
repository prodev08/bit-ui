import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'

import getItems from './AccountStatusSelect.items'

const AccountStatusSelect = ({
  className, isAllOptionDisabled, label, onChange, name, value,
}) => {
  const items = getItems(isAllOptionDisabled)

  return (
    <Select
      className={className}
      items={items}
      label={label}
      name={name}
      onChange={onChange}
      value={value}
    />
  )
}

AccountStatusSelect.propTypes = {
  className: PropTypes.string,
  isAllOptionDisabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
}

AccountStatusSelect.defaultProps = {
  className: '',
  isAllOptionDisabled: false,
  label: '',
  name: '',
  value: undefined,
}

export default AccountStatusSelect
