import React from 'react'
import PropTypes from 'prop-types'

import Signature from 'ui/FormInputs/Signature'

const ReduxSignature = ({
  canvasProps,
  disabled,
  input,
  meta,
  onChange: onChangeProp,
}) => {
  const { onChange: onInputChange, name, value } = input
  const onChange = (value) => {
    onInputChange(value)
    onChangeProp(value)
  }

  return (
    <Signature
      canvasProps={{ ...canvasProps, name }}
      input={input}
      meta={meta}
      className={disabled ? 'disabled' : ''}
      onChange={onChange}
      value={value}
    />
  )
}

ReduxSignature.propTypes = {
  disabled: PropTypes.bool,
  canvasProps: PropTypes.shape({
    className: PropTypes.string,
  }),
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({ form: PropTypes.string.isRequired }).isRequired,
  onChange: PropTypes.func,
}

ReduxSignature.defaultProps = {
  disabled: false,
  canvasProps: {},
  onChange: () => {},
}

export default ReduxSignature
