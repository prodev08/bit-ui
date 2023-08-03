import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

const withReduxForm = (WrappedComponent) => {
  const ReduxFormFieldWrapper = ({ data, disabled }) => {
    const { name } = data

    return (
      <Field
        component={WrappedComponent}
        data={data}
        disabled={disabled}
        name={name}
      />
    )
  }

  ReduxFormFieldWrapper.propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    disabled: PropTypes.bool,
  }

  ReduxFormFieldWrapper.defaultProps = {
    disabled: false,
  }

  return ReduxFormFieldWrapper
}

export default withReduxForm
