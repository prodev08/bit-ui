import React from 'react'
import Menu from '.'

const Template = (args) => (
  <Menu {...args} />
)

const baseArgs = {
  items: [
    { value: 'item1', label: 'Item1' },
    { value: 'item2', label: 'Item2', selected: true },
    { value: 'item3', label: 'Item3' },
    { value: 'item4', label: 'Item4', highlighted: true },
    { value: 'item5', label: 'Item5' },
  ],
}
const baseArgTypes = {
  items: {
    name: 'items',
    type: 'object',
  },
}
const params = {
  controls: {
    exclude: [
      'className',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Menu',
  component: Menu,
}
