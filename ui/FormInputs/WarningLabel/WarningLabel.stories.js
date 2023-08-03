import React from 'react'
import WarningLabel from '.'

const Template = (args) => (
  <WarningLabel {...args} />
)
const baseArgs = {
  warning: 'Warning',
}
const baseArgTypes = {
  warning: {
    name: 'warning',
    type: 'string',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'FormInputs/WarningLabel',
  component: WarningLabel,
}
