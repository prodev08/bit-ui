import React from 'react'
import PropTypes from 'prop-types'

import InlineEdit from '../InlineEdit'

const ReduxInlineEdit = (props) => {
  const { input, meta } = props
  const { name, onChange: onInputChange, value } = input

  const onChange = ({ val }) => {
    onInputChange(val)
  }

  return (
    <InlineEdit
      input={input}
      meta={meta}
      name={name}
      onChange={onChange}
      paramName='val'
      text={value}
    />
  )
}

ReduxInlineEdit.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({ form: PropTypes.string.isRequired }).isRequired,
}

export default ReduxInlineEdit
