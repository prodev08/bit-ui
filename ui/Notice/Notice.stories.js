import React from 'react'
import Notice from '.'

import './_Notice.scss'

const Template = (args) => (
  <Notice {...args}>Text Content</Notice>
)
const baseArgTypes = {
  size: {
    options: [undefined, 'small'],
    control: { type: 'select' },
  },
  type: {
    options: [undefined, 'green', 'red'],
    control: { type: 'select' },
  },
}
const params = {
  controls: {
    exclude: ['children', 'className'],
  },
}

export const Default = Template.bind({})
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Notice',
  component: Notice,
}
