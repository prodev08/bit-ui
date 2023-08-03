import React from 'react'

import { SecondsCountdownTimer } from '.'

const Template = (args) => <SecondsCountdownTimer {...args} />
const baseArgs = {
  seconds: 10,
}
const baseArgTypes = {
  seconds: {
    name: 'seconds',
    type: 'number',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'UI/SecondsCountdownTimer',
  component: SecondsCountdownTimer,
}
