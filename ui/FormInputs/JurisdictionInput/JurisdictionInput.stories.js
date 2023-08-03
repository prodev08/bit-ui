import React from 'react'
import { Field } from 'redux-form'

import JurisdictionInput from '.'
import { FormInputDecorator } from '../../../../.storybook/decorators'
import { REDUX_FORM_FIELD_NAME } from '../../../../.storybook/consts'

const Template = (args) => (
  <Field
    name={REDUX_FORM_FIELD_NAME}
    component={JurisdictionInput}
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
  title: 'FormInputs/JurisdictionInput',
  component: JurisdictionInput,
  decorators: [FormInputDecorator],
}
