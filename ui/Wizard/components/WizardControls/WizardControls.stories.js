import React from 'react'
import Wizard from '../../Wizard'

import WizardContent from '../WizardContent'
import WizardText from '../WizardText'
import WizardControls from './WizardControls'

const Template = (args) => (
  <Wizard isHeaderHidden>
    <WizardContent>
      <WizardText text='Wizard Controls' />
    </WizardContent>
    <WizardControls {...args} translateText={false} />
  </Wizard>
)

const baseArgs = {
  backText: 'Go Back',
  continueText: 'Continue',
  isBackDisabled: false,
  isBackHidden: false,
  isContinueDisabled: false,
  isContinueHidden: false,
}
const baseArgTypes = {
  backText: {
    name: 'backText',
    type: 'string',
  },
  continueText: {
    name: 'continueText',
    type: 'string',
  },
  isBackDisabled: {
    name: 'isBackDisabled',
    type: 'boolean',
  },
  isBackHidden: {
    name: 'isBackHidden',
    type: 'boolean',
  },
  isContinueDisabled: {
    name: 'isContinueDisabled',
    type: 'boolean',
  },
  isContinueHidden: {
    name: 'isContinueHidden',
    type: 'boolean',
  },
}

const params = {
  controls: {
    exclude: [
      'onBack',
      'onContinue',
      'className',
      'translateText',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Wizard/WizardControls',
  component: WizardControls,
}
