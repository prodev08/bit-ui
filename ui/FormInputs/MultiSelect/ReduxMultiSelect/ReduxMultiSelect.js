import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _split from 'lodash/split'
import _trim from 'lodash/trim'

import MultiSelect from '../MultiSelect'

const ReduxMultiSelect = ({
  arrayValue,
  className,
  disabled,
  filterable,
  getItemLabel,
  input,
  items,
  label,
  meta,
  placeholder,
  removeSelected,
  selectAllOption,
}) => {
  const onChange = (items) => {
    input.onChange(arrayValue ? items : items.join(','))
  }

  const { name, value } = input
  const { error, submitFailed } = meta

  const getSelectedItems = () => {
    if (value) {
      return arrayValue ? value : _split(_trim(value), /\s*,\s*/)
    }
    return []
  }

  return (
    <MultiSelect
      items={items}
      error={submitFailed ? error : ''}
      label={label}
      name={name}
      onChange={onChange}
      selectedItems={getSelectedItems()}
      removeSelected={removeSelected}
      selectAllOption={selectAllOption}
      getItemLabel={getItemLabel}
      placeholder={placeholder}
      filterable={filterable}
      disabled={disabled}
      className={className}
    />
  )
}

ReduxMultiSelect.propTypes = {
  arrayValue: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  filterable: PropTypes.bool,
  getItemLabel: PropTypes.func,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
  }).isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  removeSelected: PropTypes.bool,
  selectAllOption: PropTypes.bool,
}

ReduxMultiSelect.defaultProps = {
  arrayValue: false,
  className: '',
  disabled: false,
  filterable: true,
  getItemLabel: undefined,
  label: '',
  placeholder: '',
  removeSelected: false,
  selectAllOption: false,
}

export default memo(ReduxMultiSelect)
