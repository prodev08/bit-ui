import React from 'react'
import LinkedLabel from '.'
import { DEFAULT_LABEL } from '../../../../.storybook/consts'

const Template = (args) => (
  <LinkedLabel {...args} value={DEFAULT_LABEL} />
)
const baseArgs = {
  label: DEFAULT_LABEL,
}
const baseArgTypes = {
  href: {
    name: 'href',
    type: 'string',
  },
  label: {
    name: 'label',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: ['className', 'value'],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'FormInputs/LinkedLabel',
  component: LinkedLabel,
}
