import React from 'react'
import PropTypes from 'prop-types'

import Collapsible from '.'

const title = 'Title'
const Template = ({ title, ...args }) => (
  <Collapsible title={<p>{title}</p>} {...args}>
    Text Content
  </Collapsible>
)
Template.propTypes = {
  title: PropTypes.string,
}
Template.defaultProps = {
  title,
}
const baseArgs = {
  subTitle: 'Subtitle',
  title,
}
const baseArgTypes = {
  isOpen: {
    name: 'isOpen',
    type: 'boolean',
  },
  isOpenByDefault: {
    name: 'isOpenByDefault',
    type: 'boolean',
  },
  keepChildrenMounted: {
    name: 'keepChildrenMounted',
    type: 'boolean',
  },
  subTitle: {
    name: 'subTitle',
    type: 'string',
  },
  title: {
    name: 'title',
    type: 'string',
  },
  type: {
    options: [undefined, 'small'],
    control: { type: 'select' },
  },
}
const params = {
  controls: {
    exclude: [
      'children',
      'className',
      'onFirstOpen',
      'onToggle',
      'title',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Collapsible',
  component: Collapsible,
}
