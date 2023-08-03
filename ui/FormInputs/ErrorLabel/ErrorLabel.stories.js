import React from 'react'
import ErrorLabel from '.'

const Template = (args) => (
  <ErrorLabel {...args} />
)
const baseArgs = {
  error: 'Error',
}
const baseArgTypes = {
  error: {
    name: 'error',
    type: 'string',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'FormInputs/ErrorLabel',
  component: ErrorLabel,
}
