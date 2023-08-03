import React from 'react'
import Label from '.'
import { DEFAULT_LABEL } from '../../../../.storybook/consts'

const Template = (args) => <Label {...args} value={DEFAULT_LABEL} />
const baseArgs = {
  active: false,
  tooltip: true,
}
const baseArgTypes = {
  active: {
    name: 'active',
    type: 'boolean',
  },
  tooltip: {
    name: 'tooltip',
    type: 'boolean',
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
  title: 'FormInputs/Label',
  component: Label,
}
