import React from 'react'
import PropTypes from 'prop-types'
import _values from 'lodash/values'

import Button from '.'
import { DEFAULT_LABEL } from '../../../.storybook/consts'
import { BUTTON_SIZES, BUTTON_TYPES } from './Button.consts'

const Template = ({ label, ...args }) => (
  <Button {...args}>{label}</Button>
)
Template.propTypes = {
  label: PropTypes.string,
}
Template.defaultProps = {
  label: DEFAULT_LABEL,
}
const baseArgs = {
  disabled: false,
  label: DEFAULT_LABEL,
}
const baseArgTypes = {
  anchor: {
    name: 'anchor',
    type: 'boolean',
  },
  autoFocus: {
    name: 'autoFocus',
    type: 'boolean',
  },
  disabled: {
    name: 'disabled',
    type: 'boolean',
  },
  label: {
    name: 'label',
    type: 'string',
  },
  loading: {
    name: 'loading',
    type: 'boolean',
  },
  size: {
    options: [undefined, BUTTON_SIZES.LARGE],
    control: { type: 'select' },
  },
  type: {
    options: [undefined, ..._values(BUTTON_TYPES)],
    control: { type: 'select' },
  },
}
const params = {
  controls: {
    exclude: [
      'children',
      'className',
      'elementRef',
      'onClick',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Button',
  component: Button,
}
