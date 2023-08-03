import React from 'react'
import Steps from '.'

const Template = (args) => (
  <Steps {...args} />
)

const baseArgs = {
  numberOfSteps: 3,
  activeStep: 1,
}
const baseArgTypes = {
  numberOfSteps: {
    name: 'numberOfSteps',
    type: 'number',
  },
  activeStep: {
    name: 'activeStep',
    type: 'number',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'UI/Steps',
  component: Steps,
}
