import React from 'react'
import PropTypes from 'prop-types'

import Icons from 'icons'
import Card from '.'
import { DEFAULT_LABEL } from '../../../.storybook/consts'

const onClick = () => {}

const Template = ({ label, ...args }) => (
  <Card Icon={Icons.BFX_PAY} onClick={onClick} {...args}>{label}</Card>
)
Template.propTypes = {
  label: PropTypes.string,
}
Template.defaultProps = {
  label: DEFAULT_LABEL,
}
const baseArgs = {
  isActive: false,
  isDisabled: false,
  label: DEFAULT_LABEL,
  name: 'Name',
  title: 'Title',
}
const baseArgTypes = {
  isActive: {
    name: 'isActive',
    type: 'boolean',
  },
  isDisabled: {
    name: 'isDisabled',
    type: 'boolean',
  },
  label: {
    name: 'label',
    type: 'string',
  },
  name: {
    name: 'name',
    type: 'string',
  },
  title: {
    name: 'title',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: ['Icon', 'onClick'],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Card',
  component: Card,
}
