import React from 'react'
import ExternalLink from '.'
import { DEFAULT_LABEL } from '../../../.storybook/consts'

const Template = (args) => (
  <ExternalLink {...args} value={DEFAULT_LABEL} />
)
const baseArgs = {
  title: 'Title',
  src: '#',
}
const baseArgTypes = {
  title: {
    name: 'title',
    type: 'string',
  },
  src: {
    name: 'src',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: ['className', 'onClick'],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/ExternalLink',
  component: ExternalLink,
}
