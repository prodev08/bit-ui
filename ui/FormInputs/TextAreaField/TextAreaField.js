import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TextArea } from '@blueprintjs/core'

import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'

import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import getOnChangeHandler from './TextAreaField.onChange'
import onKeyDownHelper from '../utils/onKeyDownHelper'
import selectTextOnFocus from '../utils/selectTextOnFocus'

const TextAreaField = ({
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
  onBlur,
  onChange,
  onChangeFilter,
  onClick,
  onEnterKey,
  placeholder,
  selectOnFocus,
  submitOnEnterKey,
  value,
}) => {
  const { active, error, submitFailed } = meta || {}
  const classes = classNames('custom-textarea-field', className, { active, disabled })

  const showError = (submitFailed || alwaysShowError) && error
  const showWarning = !showError && !customError && missingValueMessage
  const inputClasses = classNames('custom-textarea-field-textarea', inputClass, {
    error: showError,
    warning: showWarning,
  })

  const isLabelActive = !!(active || isLabelAlwaysActive
    || (input && (input.value || (meta && !meta.touched && meta.initial)))
    || (!meta && value))

  const onFocus = selectOnFocus
    ? selectTextOnFocus
    : input && input.onFocus

  return (
    <div className={classes} onClick={onClick}>
      <TextArea
        className={inputClasses}
        name={name}
        onBlur={onBlur}
        onKeyDown={(e) => onKeyDownHelper({
          onEnterKey, onBlur, submitOnEnterKey, meta,
        }, e)}
        value={value}
        {...input}
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        inputRef={elementRef}
        onChange={getOnChangeHandler({ input, onChange, onChangeFilter })}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={disabled}
        tabIndex={disabled ? -1 : 'auto'}
      />
      {showError && <ErrorLabel error={error} />}
      <ErrorLabel error={customError} />
      {showWarning && <WarningLabel warning={missingValueMessage} />}
      <Label value={label} active={isLabelActive} />
    </div>
  )
}

TextAreaField.propTypes = {
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
  selectOnFocus: PropTypes.bool,
  submitOnEnterKey: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
}

TextAreaField.defaultProps = {
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
  selectOnFocus: false,
  submitOnEnterKey: false,
  value: '',
  placeholder: '',
}

export default withMissingInputValueMessage(TextAreaField)
