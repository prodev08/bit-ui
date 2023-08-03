import React from 'react'
import DateInputs from '.'

const onChange = () => {}
const Template = (args) => (
  <DateInputs {...args} onChange={onChange} />
)
const baseArgs = {
  shouldSetToDefaults: false,
}
const baseArgTypes = {
  defaultStartDate: {
    name: 'defaultStartDate',
    type: 'number',
  },
  defaultEndDate: {
    name: 'defaultEndDate',
    type: 'number',
  },
  shouldSetToDefaults: {
    name: 'shouldSetToDefaults',
    type: 'boolean',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'UI/DateInputs',
  component: DateInputs,
}
