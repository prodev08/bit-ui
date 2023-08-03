import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import Select from '.'
import { FormInputDecorator } from '../../../../.storybook/decorators'
import { withMissingFormFieldValueMessage } from '../../../../.storybook/utils'
import {
  DEFAULT_LABEL,
  DEFAULT_MISSING_VALUE_MESSAGE,
  DEFAULT_VALIDATION_ERROR,
  REDUX_FORM_FIELD_NAME,
  REDUX_FORM_NAME,
} from '../../../../.storybook/consts'

const items = [
  { value: 'value_1', label: 'Option #1' },
  { value: 'value_2', label: 'Option #2' },
  { value: 'value_3', label: 'Option #3' },
]

const Template = (args) => <Field name={REDUX_FORM_FIELD_NAME} component={Select} {...args} />
const baseArgs = {
  disabled: false,
  label: DEFAULT_LABEL,
  items,
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

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

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
  <WithValidationErrorBase meta={{ error, submitFailed: true, form: REDUX_FORM_NAME }} {...args} />
)
WithValidationError.propTypes = {
  error: PropTypes.string,
}
WithValidationError.defaultProps = {
  error: DEFAULT_VALIDATION_ERROR,
}
WithValidationError.args = { ...baseArgs, error: DEFAULT_VALIDATION_ERROR }

export default {
  title: 'FormInputs/Select',
  component: Select,
  decorators: [FormInputDecorator],
}
