import React from 'react'

import Icons from 'icons'
import Wizard from './Wizard'
import WizardContent from './components/WizardContent'
import WizardControls from './components/WizardControls'
import WizardText, { WIZARD_TEXT_TYPE } from './components/WizardText'
import WizardNotice, { WIZARD_NOTICE_INTENT } from './components/WizardNotice'

const Template = (args) => (
  <Wizard {...args}>
    <WizardContent>
      <WizardText
        type={WIZARD_TEXT_TYPE.TITLE}
        text='Wizard Title'
      />
      <WizardText
        type={WIZARD_TEXT_TYPE.SUBTITLE}
        text='Wizard Subtitle'
      />
      <WizardText
        type={WIZARD_TEXT_TYPE.TEXT}
        text='Wizard Text'
      />
      <WizardNotice
        intent={WIZARD_NOTICE_INTENT.SUCCESS}
        icon={<Icons.LIGHTBULB />}
        text='Wizard Notice'
        fullWidth
      />
      <WizardNotice
        intent={WIZARD_NOTICE_INTENT.INFO}
        icon={<Icons.LOCK />}
        text='Wizard Outside Notice'
        placeOutside
      />
    </WizardContent>
    <WizardControls />
  </Wizard>
)

const baseArgs = {
  numberOfSteps: 3,
  activeStep: 1,
  isHeaderHidden: false,
  isMobileFullScreen: false,
}
const baseArgTypes = {
  numberOfSteps: {
    name: 'numberOfSteps',
    type: 'number',
  },
  activeStep: {
    name: 'activeStep',
    type: 'number',
  },
  isHeaderHidden: {
    name: 'isHeaderHidden',
    type: 'boolean',
  },
  isMobileFullScreen: {
    name: 'isMobileFullScreen',
    type: 'boolean',
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
  title: 'UI/Wizard',
  component: Wizard,
}
