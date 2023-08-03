import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import { Field } from 'redux-form'
import InputField from '../InputField/InputField'

const InputFields = ({ fields, t }) => {
  if (_isEmpty(fields)) {
    return ''
  }
  return (
    <>
      {_map(fields, (field) => {
        const { name, label } = field
        return (
          <Field
            key={name}
            name={name}
            label={t(label)}
            component={InputField}
          />
        )
      })}
    </>
  )
}

InputFields.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  })),
  t: PropTypes.func.isRequired,
}
InputFields.defaultProps = {
  fields: [],
}

export default InputFields
