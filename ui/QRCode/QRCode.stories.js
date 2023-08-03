import React from 'react'
import QRCode from '.'

const value = 'Value'
const Template = (args) => <QRCode {...args} />
const baseArgs = {
  size: 411,
  value,
}
const baseArgTypes = {
  size: {
    name: 'size',
    type: 'number',
  },
  value: {
    name: 'value',
    type: 'string',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'UI/QRCode',
  component: QRCode,
}
