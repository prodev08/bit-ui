import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InputGroup } from '@blueprintjs/core'

import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'
import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'

import getOnChangeHandler from './InputField.onChange'
import onKeyDownHelper from '../utils/onKeyDownHelper'
import selectTextOnFocus from '../utils/selectTextOnFocus'

const InputField = ({
  alwaysShowError,
  autoFocus,
  className,
  customError,
  disabled,
  elementRef,
  input,
  inputClass,
  isLabelAlwaysActive,
  label,
  meta,
  missingValueMessage,
  name,
  onChange,
  onChangeFilter,
  onClick,
  onBlur,
  onEnterKey,
  rightElement,
  selectOnFocus,
  submitOnEnterKey,
  type,
  value,
  placeholder,
}) => {
  const { active, error, submitFailed } = meta || {}
  const classes = classNames('custom-input-field', className, { active, disabled })

  const showError = (submitFailed || alwaysShowError) && error
  const showWarning = !showError && !customError && missingValueMessage
  const inputClasses = classNames('custom-input-field-input', inputClass, {
    error: showError || !!customError,
    warning: showWarning,
  })

  const isLabelActive = !!(
    active ||
    isLabelAlwaysActive ||
    (input && (input.value || input.value === 0 || (meta.touched === false && meta.initial))) ||
    (!meta && value)
  )

  const onFocus = selectOnFocus
    ? selectTextOnFocus
    : input && input.onFocus

  return (
    <div className={classes} onClick={onClick}>
      <Label value={label} active={isLabelActive} />
      <InputGroup
        className={inputClasses}
        name={name}
        onBlur={onBlur}
        onKeyDown={(e) => onKeyDownHelper(
          {
            meta,
            onBlur,
            onEnterKey,
            submitOnEnterKey,
          },
          e,
        )}
        type={type}
        value={value}
        {...input}
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        inputRef={elementRef}
        onChange={getOnChangeHandler({ input, onChange, onChangeFilter })}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={disabled}
        rightElement={rightElement}
        tabIndex={disabled ? -1 : 'auto'}
      />
      {showError && <ErrorLabel error={error} />}
      <ErrorLabel error={customError} />
      {showWarning && <WarningLabel warning={missingValueMessage} />}
    </div>
  )
}

InputField.propTypes = {
  alwaysShowError: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  customError: PropTypes.string,
  disabled: PropTypes.bool,
  elementRef: PropTypes.object,
  input: PropTypes.object,
  inputClass: PropTypes.string,
  isLabelAlwaysActive: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  meta: PropTypes.object,
  missingValueMessage: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onClick: PropTypes.func,
  onEnterKey: PropTypes.func,
  rightElement: PropTypes.element,
  selectOnFocus: PropTypes.bool,
  submitOnEnterKey: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
}

InputField.defaultProps = {
  alwaysShowError: false,
  autoFocus: false,
  className: '',
  customError: '',
  disabled: false,
  elementRef: undefined,
  input: undefined,
  inputClass: '',
  isLabelAlwaysActive: false,
  label: '',
  meta: undefined,
  missingValueMessage: undefined,
  name: undefined,
  onBlur: () => { },
  onChange: () => { },
  onChangeFilter: () => { },
  onClick: () => { },
  onEnterKey: undefined,
  rightElement: undefined,
  selectOnFocus: false,
  submitOnEnterKey: false,
  type: 'text',
  value: '',
  placeholder: '',
}

export default withMissingInputValueMessage(InputField)
