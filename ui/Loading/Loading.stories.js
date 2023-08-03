import React from 'react'

import Loading from '.'

const Template = (args) => <Loading {...args} />
const baseArgs = {
  hasData: false,
  isLoading: true,
}
const baseArgTypes = {
  hasData: {
    name: 'hasData',
    type: 'boolean',
  },
  isLoading: {
    name: 'isLoading',
    type: 'boolean',
  },
  spinnerSize: {
    name: 'spinnerSize',
    type: 'number',
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes

export default {
  title: 'UI/Loading',
  component: Loading,
}
