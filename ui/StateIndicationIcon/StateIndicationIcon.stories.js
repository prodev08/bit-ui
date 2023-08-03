import React from 'react'
import StateIndicationIcon from '.'

const Template = (args) => <StateIndicationIcon {...args} />
const baseArgs = {
  state: false,
}
const baseArgTypes = {
  state: {
    name: 'state',
    type: 'boolean',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'UI/StateIndicationIcon',
  component: StateIndicationIcon,
}
