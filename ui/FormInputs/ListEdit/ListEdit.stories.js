import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import ListEdit from '.'
import { FormInputDecorator } from '../../../../.storybook/decorators'
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
    component={ListEdit}
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
WithMissingValueMessage.args = {
  ...baseArgs,
  missingValueMessage: DEFAULT_MISSING_VALUE_MESSAGE,
}
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

export default {
  title: 'FormInputs/ListEdit',
  component: ListEdit,
  decorators: [FormInputDecorator],
}
