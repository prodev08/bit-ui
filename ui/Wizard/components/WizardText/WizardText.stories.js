import React from 'react'
import _values from 'lodash/values'

import Wizard from '../../Wizard'
import WizardContent from '../WizardContent'
import WizardText from './WizardText'
import {
  WIZARD_TEXT_ALIGN,
  WIZARD_TEXT_TYPE,
} from './WizardText.constants'

const Template = (args) => (
  <Wizard isHeaderHidden>
    <WizardContent>
      <WizardText {...args} />
    </WizardContent>
  </Wizard>
)

const baseArgs = {
  text: 'Wizard Title',
  type: WIZARD_TEXT_TYPE.TITLE,
  align: WIZARD_TEXT_ALIGN.CENTER,
}
const baseArgTypes = {
  text: {
    name: 'text',
    type: 'string',
  },
  type: {
    name: 'type',
    options: _values(WIZARD_TEXT_TYPE),
    type: 'select',
  },
  align: {
    name: 'align',
    options: _values(WIZARD_TEXT_ALIGN),
    type: 'select',
  },
}
const params = {
  controls: {
    exclude: [
      'children',
      'className',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Wizard/WizardText',
  component: WizardText,
}
