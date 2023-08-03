import React from 'react'

import { THEME_TYPES } from 'var/themes'
import Logo from './Logo'

const themeTypes = Object.values(THEME_TYPES)

const Template = (args) => <Logo {...args} />
const baseArgs = {
  theme: themeTypes[0],
}
const baseArgTypes = {
  theme: {
    options: themeTypes,
    control: { type: 'select' },
  },
}
const params = {
  controls: {
    exclude: ['className'],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Logo',
  component: Logo,
}
