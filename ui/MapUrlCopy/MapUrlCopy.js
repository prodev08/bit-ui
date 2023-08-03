import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import _get from 'lodash/get'

import Icons from 'icons'
import copyToClipboard from 'utils/copyToClipboard'

const Component = (props) => {
  const value = _get(props, ['input', 'value'])
  if (!value) {
    return null
  }

  return (
    <Icons.MARKER
      onClick={() => {
        copyToClipboard({
          data: value,
          onSuccess: true,
        })
      }}
    />
  )
}

const MapUrlCopy = ({ name }) => (
  <Field
    name={name}
    component={Component}
  />
)

MapUrlCopy.propTypes = {
  name: PropTypes.string.isRequired,
}

export default MapUrlCopy
