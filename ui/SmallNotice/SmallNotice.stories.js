import React from 'react'
import PropTypes from 'prop-types'
import _keys from 'lodash/keys'

import { Intent } from '@blueprintjs/core'
import Icons from 'icons'
import SmallNotice from '.'

const ICON_KEYS = _keys(Icons)
const defaultIconKey = ICON_KEYS[0]
const INTENT_KEYS = _keys(Intent)
const defaultIntentKey = INTENT_KEYS[0]

const Template = ({ icon, intent, ...args }) => (
  <SmallNotice Icon={Icons[icon]} intent={Intent[intent]} {...args}>
    Text Content
  </SmallNotice>
)
Template.propTypes = {
  icon: PropTypes.string,
  intent: PropTypes.string,
}
Template.defaultProps = {
  icon: defaultIconKey,
  intent: defaultIntentKey,
}
const baseArgs = {
  icon: defaultIconKey,
  intent: defaultIntentKey,
}
const baseArgTypes = {
  icon: {
    options: ICON_KEYS,
    control: { type: 'select' },
  },
  intent: {
    options: INTENT_KEYS,
    control: { type: 'select' },
  },
}
const params = {
  controls: {
    exclude: ['children', 'className', 'Icon'],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/SmallNotice',
  component: SmallNotice,
}
