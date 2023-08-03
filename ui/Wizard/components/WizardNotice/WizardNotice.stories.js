import React from 'react'
import _values from 'lodash/values'

import Icons from 'icons'
import Wizard from '../../Wizard'
import WizardContent from '../WizardContent'
import WizardNotice from './WizardNotice'
import {
  WIZARD_NOTICE_SIZE,
  WIZARD_NOTICE_INTENT,
} from './WizardNotice.constants'

const Template = (args) => (
  <Wizard isHeaderHidden>
    <WizardContent>
      <WizardNotice
        icon={<Icons.LIGHTBULB />}
        {...args}
      />
    </WizardContent>
  </Wizard>
)

const baseArgs = {
  text: 'Wizard Notice',
  size: WIZARD_NOTICE_SIZE.NORMAL,
  intent: WIZARD_NOTICE_INTENT.SUCCESS,
  fullWidth: true,
  placeOutside: false,
}
const baseArgTypes = {
  text: {
    name: 'text',
    type: 'string',
  },
  size: {
    name: 'size',
    options: _values(WIZARD_NOTICE_SIZE),
    type: 'select',
  },
  intent: {
    name: 'intent',
    options: _values(WIZARD_NOTICE_INTENT),
    type: 'select',
  },
  fullWidth: {
    name: 'fullWidth',
    type: 'boolean',
  },
  placeOutside: {
    name: 'placeOutside',
    type: 'boolean',
  },
}
const params = {
  controls: {
    exclude: [
      'children',
      'className',
      'icon',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Wizard/WizardNotice',
  component: WizardNotice,
}
