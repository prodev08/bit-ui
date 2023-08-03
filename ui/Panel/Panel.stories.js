import React from 'react'
import PropTypes from 'prop-types'
import { Button, Intent } from '@blueprintjs/core'

import Panel from '.'

const title = 'Title'
const Template = ({ title, ...args }) => (
  <Panel
    title={<p>{title}</p>}
    actions={(
      <Button intent={Intent.SUCCESS}>
        Action
      </Button>
    )}
    {...args}
  >
    Content
  </Panel>
)
Template.propTypes = {
  title: PropTypes.string,
}
Template.defaultProps = {
  title,
}

const baseArgs = {
  title,
}
const baseArgTypes = {
  title: {
    name: 'title',
    type: 'string',
  },
}
const params = {
  controls: {
    exclude: [
      'children',
      'className',
      'actions',
    ],
  },
}

export const Default = Template.bind({})
Default.args = baseArgs
Default.argTypes = baseArgTypes
Default.parameters = params

export default {
  title: 'UI/Panel',
  component: Panel,
}
