import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import CountryCode from '.'
import { FormInputDecorator } from '../../../../.storybook/decorators'
import { REDUX_FORM_FIELD_NAME, REDUX_FORM_NAME } from '../../../../.storybook/consts'

const Template = (args) => (
  <Field
    name={REDUX_FORM_FIELD_NAME}
    component={CountryCode}
    {...args}
  />
)
const baseArgs = {
  disabled: false,
}
const baseArgTypes = {
  disabled: {
    name: 'disabled',
    type: 'boolean',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

const WithValidationErrorBase = Template.bind({})
export const WithValidationError = ({ error, ...args }) => (
  <WithValidationErrorBase
    meta={{ error, submitFailed: true, form: REDUX_FORM_NAME }}
    {...args}
  />
)
WithValidationError.propTypes = {
  error: PropTypes.string,
}
WithValidationError.defaultProps = {
  error: 'Text',
}
WithValidationError.args = {
  ...baseArgs,
  error: 'Error',
}
WithValidationError.argTypes = {
  ...baseArgTypes,
  error: {
    name: 'error',
    type: 'string',
  },
}

export default {
  title: 'FormInputs/CountryCode',
  component: CountryCode,
  decorators: [FormInputDecorator],
}
