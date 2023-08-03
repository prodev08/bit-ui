import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { FormInputDecorator } from '../../../../.storybook/decorators'
import FileInput from '.'
import { withMissingFormFieldValueMessage } from '../../../../.storybook/utils'
import {
  DEFAULT_LABEL,
  DEFAULT_MISSING_VALUE_MESSAGE,
  DEFAULT_VALIDATION_ERROR,
  REDUX_FORM_FIELD_NAME,
  REDUX_FORM_NAME,
} from '../../../../.storybook/consts'

const Template = (args) => (
  <Field
    name={REDUX_FORM_FIELD_NAME}
    component={FileInput}
    {...args}
  />
)
const baseArgs = {
  disabled: false,
  inputLabel: DEFAULT_LABEL,
}
const baseArgTypes = {
  disabled: {
    name: 'disabled',
    type: 'boolean',
  },
  inputLabel: {
    name: 'label',
    type: 'string',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.args = baseArgs

const WithMissingValueMessageBase = Template.bind({})
export const WithMissingValueMessage = withMissingFormFieldValueMessage(WithMissingValueMessageBase)
WithMissingValueMessage.propTypes = {
  missingValueMessage: PropTypes.string,
}
WithMissingValueMessage.defaultProps = {
  missingValueMessage: DEFAULT_MISSING_VALUE_MESSAGE,
}
WithMissingValueMessage.args = { ...baseArgs, missingValueMessage: DEFAULT_MISSING_VALUE_MESSAGE }
WithMissingValueMessage.argTypes = {
  ...baseArgTypes,
  missingValueMessage: {
    name: 'missingValueMessage',
    type: 'string',
  },
}

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
WithValidationError.args = { ...baseArgs, error: DEFAULT_VALIDATION_ERROR }
WithValidationError.argTypes = {
  ...baseArgTypes,
  error: {
    name: 'error',
    type: 'string',
  },
}

export default {
  title: 'FormInputs/FileInput',
  component: FileInput,
  decorators: [FormInputDecorator],
}
