import React from 'react'
import { Field } from 'redux-form'

import TinInput from '.'
import { FormInputDecorator } from '../../../../.storybook/decorators'
import { REDUX_FORM_FIELD_NAME } from '../../../../.storybook/consts'

const Template = (args) => (
  <Field
    name={REDUX_FORM_FIELD_NAME}
    component={TinInput}
    countryCode='032'
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

export default {
  title: 'FormInputs/TinInput',
  component: TinInput,
  decorators: [FormInputDecorator],
}
