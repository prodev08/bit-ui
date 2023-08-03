import React from 'react'
import { Field } from 'redux-form'

import { FormInputDecorator } from '../../../../.storybook/decorators'
import Radio from './Radio'

const Template = (args) => (
  <>
    <div className='wizard'>
      <Field
        {...args}
        component={Radio}
      />
    </div>
    <Field
      {...args}
      id='2'
      name='default_radio'
      label='default radio'
      component={Radio}
    />
  </>
)

const baseArgs = {
  id: '1',
  name: 'wizard_radio',
  label: 'wizard radio',
}

export const Default = Template.bind({})
Default.args = baseArgs

export default {
  title: 'FormInputs/Radio',
  component: Radio,
  decorators: [FormInputDecorator],
}
