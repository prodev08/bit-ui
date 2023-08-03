import React from 'react'
import PropTypes from 'prop-types'
import { Radio as BlueprintRadio } from '@blueprintjs/core'

const Radio = ({
  id, input, label, onChange, value,
}) => {
  const checked = (value || input.value) === id

  return (
    <div className='custom-radio'>
      <BlueprintRadio
        className='custom-radio-input'
        checked={checked}
        name={input.name}
        id={id}
        value={id}
        onChange={onChange || input.onChange}
      >
        <span className='label'>{label}</span>
      </BlueprintRadio>
    </div>
  )
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

Radio.defaultProps = {
  input: {},
  label: '',
  onChange: undefined,
  value: '',
}

export default Radio
