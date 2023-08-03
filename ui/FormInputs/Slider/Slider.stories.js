import React, { useState } from 'react'

import Slider from './Slider'

const Template = () => {
  const [value, setValue] = useState(0)
  return (
    <Slider
      meta={{
        error: 'ERROR',
      }}
      alwaysShowError
      label='Slider'
      value={value}
      onChange={setValue}
      labelRenderer={(e, { isHandleTooltip }) => {
        if (isHandleTooltip) return e
        if (e >= 10) {
          return `${e} + Years`
        }
        return `${e} Years`
      }}
    />
  )
}

export const Default = Template.bind({})

export default {
  title: 'FormInputs/Slider',
  component: Slider,
}
