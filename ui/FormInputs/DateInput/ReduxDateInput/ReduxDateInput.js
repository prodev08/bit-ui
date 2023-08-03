import React, { memo } from 'react'
import PropTypes from 'prop-types'

import DateInput from 'ui/FormInputs/DateInput/index'

const ReduxDateInput = ({
  alwaysShowError,
  dateFormat,
  disabled,
  input,
  label,
  meta,
  placeholder,
  className,
  timestamp,
}) => {
  const { error, submitFailed } = meta

  const { name, value, onChange } = input

  const onChangeHandler = (date) => {
    onChange(date)
  }

  return (
    <DateInput
      alwaysShowError={alwaysShowError}
      date={value}
      dateFormat={dateFormat}
      disabled={disabled}
      error={(submitFailed || alwaysShowError) && error ? error : ''}
      label={label}
      name={name}
      onChange={onChangeHandler}
      placeholder={placeholder}
      className={className}
      timestamp={timestamp}
    />
  )
}

ReduxDateInput.propTypes = {
  alwaysShowError: PropTypes.bool,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  timestamp: PropTypes.bool,
}

ReduxDateInput.defaultProps = {
  alwaysShowError: false,
  dateFormat: undefined,
  disabled: false,
  label: '',
  placeholder: '',
  className: '',
  timestamp: false,
}

export default memo(ReduxDateInput)
