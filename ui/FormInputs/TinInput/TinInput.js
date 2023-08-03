import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import InputField from 'ui/FormInputs/InputField'

const TinInput = ({
  alwaysShowError,
  className,
  disabled,
  input,
  jurisdiction,
  label,
  initialValue,
  validation,
}) => {
  const [tin, setTin] = useState(initialValue)
  const inputRef = useRef(null)
  const { name, onChange } = input

  const onBlur = ({ target }) => {
    const { value } = target
    if (validation) {
      validation(value, name, inputRef, jurisdiction)
    }
  }

  const handleOnChange = ({ target }) => {
    const { value } = target
    setTin(value)
    onChange(value)
  }

  return (
    <div className='tin'>
      {label}
      <InputField
        elementRef={inputRef}
        className={classNames('tin-code', 'custom-input-field-input', className)}
        value={tin}
        onChange={handleOnChange}
        alwaysShowError={alwaysShowError}
        disabled={disabled}
        onBlur={onBlur}
        name={name}
      />
    </div>
  )
}

TinInput.propTypes = {
  alwaysShowError: PropTypes.bool,
  validation: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.object,
  jurisdiction: PropTypes.string,
  label: PropTypes.string,
  initialValue: PropTypes.string,
}

TinInput.defaultProps = {
  alwaysShowError: false,
  validation: null,
  className: '',
  disabled: false,
  input: {},
  jurisdiction: '',
  label: '',
  initialValue: '',
}

export default TinInput
