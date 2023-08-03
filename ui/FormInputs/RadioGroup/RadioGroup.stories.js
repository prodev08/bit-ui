import React from 'react'
import PropTypes from 'prop-types'

import { FormInputDecorator } from '../../../../.storybook/decorators'
import RadioGroup from '.'
import {
  DEFAULT_LABEL, DEFAULT_MISSING_VALUE_MESSAGE, REDUX_FORM_FIELD_NAME,
} from '../../../../.storybook/consts'
import { withMissingFormFieldValueMessage } from '../../../../.storybook/utils'

const options = [
  { value: 'value_1', label: 'Option #1' },
  { value: 'value_2', label: 'Option #2' },
  { value: 'value_3', label: 'Option #3' },
]

const Template = ({ label, options, ...args }) => (
  <RadioGroup
    data={{ label, name: REDUX_FORM_FIELD_NAME, options }}
    {...args}
  />
)
Template.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(
    {
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    },
  )),
}
Template.defaultProps = {
  label: DEFAULT_LABEL,
  options,
}
const baseArgs = {
  disabled: false,
  label: DEFAULT_LABEL,
  options,
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

export default {
  title: 'FormInputs/RadioGroup',
  component: RadioGroup,
  decorators: [FormInputDecorator],
}
