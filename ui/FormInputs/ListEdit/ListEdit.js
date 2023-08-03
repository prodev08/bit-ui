import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _map from 'lodash/map'
import _get from 'lodash/get'
import _filter from 'lodash/filter'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _includes from 'lodash/includes'
import _isString from 'lodash/isString'
import _isNumber from 'lodash/isNumber'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import InputField from 'ui/FormInputs/InputField'
import Suggest from 'ui/FormInputs/Suggest'
import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'

const ListEdit = ({
  className,
  label,
  value,
  name,
  type,
  disabled,
  placeholder,
  showLabel,
  alwaysShowError,
  onChange,
  meta,
  input,
  missingValueMessage,
  suggestItems,
  suggestItemRenderer,
  suggestItemGetValue,
  suggestItemFilter,
}) => {
  const { error, submitFailed } = meta

  const {
    name: inputName,
    value: inputValue,
    onChange: inputOnChange,
  } = input
  const editValue = inputValue || value || []
  const [itemToAdd, setItemToAdd] = useState('')

  const showError = (alwaysShowError || submitFailed) && error
  const showWarning = !showError && missingValueMessage

  const classes = classNames(
    'list-edit',
    className,
    {
      disabled,
      error: showError,
      warning: showWarning,
      'list-edit-empty': _isEmpty(editValue),
    },
  )

  const onChangeHandler = (newValue) => {
    if (inputOnChange) {
      inputOnChange(newValue)
    } else {
      onChange(newValue)
    }
  }

  const onItemToAddChange = (value) => {
    let item
    if (_isString(value) || _isNumber(value)) {
      item = value
    } else {
      item = _get(value, ['target', 'value'], '')
    }
    setItemToAdd(item)
  }

  const onItemAdd = () => {
    if (!_isEmpty(itemToAdd) && !_includes(editValue, itemToAdd)) {
      const newValue = [...editValue, itemToAdd]
      onChangeHandler(newValue)
    }
    setItemToAdd('')
  }

  const onItemRemove = (itemToRemove) => {
    const newValue = _filter(
      editValue,
      (item) => !_isEqual(item, itemToRemove),
    )
    onChangeHandler(newValue)
  }

  const onItemSelect = (item) => {
    if (!_isEmpty(item) && !_includes(editValue, item)) {
      const newValue = [...editValue, item]
      onChangeHandler(newValue)
    }
    setItemToAdd('')
  }

  const addButton = (
    <Button
      className='list-edit-button'
      disabled={_isEmpty(itemToAdd)}
      icon={IconNames.ADD}
      onClick={onItemAdd}
      minimal
    />
  )

  const inputEditor = suggestItems
    ? (
      <Suggest
        className='list-edit-input'
        name={inputName || name}
        value={itemToAdd}
        placeholder={placeholder}
        disabled={disabled}
        rightElement={addButton}
        onChange={onItemToAddChange}
        onItemSelect={onItemSelect}
        items={suggestItems}
        itemRenderer={suggestItemRenderer}
        itemGetValue={suggestItemGetValue}
        itemFilter={suggestItemFilter}
      />
    )
    : (
      <InputField
        className='list-edit-input'
        name={inputName || name}
        value={itemToAdd}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        rightElement={addButton}
        onChange={onItemToAddChange}
        onEnterKey={onItemAdd}
      />
    )

  return (
    <div className={classes}>
      {showLabel && <Label value={label} />}
      {inputEditor}
      {!_isEmpty(editValue) && (
        <div className='list-edit-content'>
          {_map(editValue, (item) => (
            <div className='list-edit-item' key={item}>
              <div>{item}</div>
              <Button
                className='list-edit-button'
                disabled={disabled}
                icon={IconNames.TRASH}
                onClick={() => onItemRemove(item)}
                minimal
              />
            </div>
          ))}
        </div>
      )}
      {showError && <ErrorLabel error={error} />}
      {showWarning && <WarningLabel warning={missingValueMessage} />}
    </div>
  )
}

ListEdit.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  name: PropTypes.string,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  alwaysShowError: PropTypes.bool,
  onChange: PropTypes.func,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }),
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }),
  missingValueMessage: PropTypes.string,
  suggestItems: PropTypes.array,
  suggestItemRenderer: PropTypes.func,
  suggestItemGetValue: PropTypes.func,
  suggestItemFilter: PropTypes.func,
}

ListEdit.defaultProps = {
  className: '',
  label: '',
  value: [],
  name: undefined,
  type: 'text',
  disabled: false,
  placeholder: '',
  showLabel: true,
  alwaysShowError: false,
  onChange: () => { },
  meta: {},
  input: {},
  missingValueMessage: undefined,
  suggestItems: undefined,
  suggestItemRenderer: undefined,
  suggestItemGetValue: undefined,
  suggestItemFilter: undefined,
}

export default withMissingInputValueMessage(ListEdit)
