import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import ReduxSignature from '.'
import { FormInputDecorator } from '../../../../../.storybook/decorators'
import {
  DEFAULT_LABEL,
  DEFAULT_VALIDATION_ERROR,
  REDUX_FORM_FIELD_NAME,
  REDUX_FORM_NAME,
} from '../../../../../.storybook/consts'

const Template = (args) => (
  <Field
    name={REDUX_FORM_FIELD_NAME}
    component={ReduxSignature}
    {...args}
  />
)
const baseArgs = {
  disabled: false,
  label: DEFAULT_LABEL,
}
const baseArgTypes = {
  disabled: {
    name: 'disabled',
    type: 'boolean',
  },
  label: {
    name: 'label',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: ['canvasProps', 'input', 'meta', 'onChange'],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

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
  error: DEFAULT_VALIDATION_ERROR,
}
WithValidationError.args = {
  ...baseArgs,
  error: DEFAULT_VALIDATION_ERROR,
}
WithValidationError.argTypes = {
  ...baseArgTypes,
  error: {
    name: 'error',
    type: 'string',
  },
}
WithValidationError.parameters = params

export default {
  title: 'FormInputs/Signature/ReduxSignature',
  component: ReduxSignature,
  decorators: [FormInputDecorator],
}
