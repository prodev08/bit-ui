import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import DATE_FORMATS from 'utils/dates/formats'
import ReduxDateInput from '.'
import { FormInputDecorator } from '../../../../../.storybook/decorators'
import {
  DEFAULT_LABEL,
  DEFAULT_VALIDATION_ERROR,
  REDUX_FORM_FIELD_NAME,
  REDUX_FORM_NAME,
} from '../../../../../.storybook/consts'

const {
  EXCEL_FORMAT,
  EXPORT_DATE,
  SHORT_DATE,
  FULL_DATE,
  STANDARD_DATE,
  STANDARD_DATE_SHORT,
} = DATE_FORMATS

const Template = (args) => (
  <Field
    name={REDUX_FORM_FIELD_NAME}
    component={ReduxDateInput}
    {...args}
  />
)
const baseArgs = {
  alwaysShowError: false,
  dateFormat: STANDARD_DATE_SHORT,
  disabled: false,
  label: DEFAULT_LABEL,
  placeholder: '',
}
const baseArgTypes = {
  alwaysShowError: {
    name: 'alwaysShowError',
    type: 'boolean',
  },
  dateFormat: {
    options: [
      EXCEL_FORMAT,
      EXPORT_DATE,
      SHORT_DATE,
      FULL_DATE,
      STANDARD_DATE,
      STANDARD_DATE_SHORT,
    ],
    control: { type: 'select' },
  },
  disabled: {
    name: 'disabled',
    type: 'boolean',
  },
  label: {
    name: 'label',
    type: 'string',
  },
  placeholder: {
    name: 'placeholder',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: ['input', 'meta'],
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
  title: 'FormInputs/DateInput/ReduxDateInput',
  component: ReduxDateInput,
  decorators: [FormInputDecorator],
}
