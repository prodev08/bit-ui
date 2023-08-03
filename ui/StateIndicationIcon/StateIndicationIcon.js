import React from 'react'
import PropTypes from 'prop-types'

import Icons from 'icons'

const StateIndicationIcon = ({ state }) => (
  <div className='state-indication-icon'>
    {state ? (
      <Icons.CHECKMARK className='state-indication-icon-checkmark' />
    ) : (
      <Icons.CROSS className='state-indication-icon-cross' />
    )}
  </div>
)

StateIndicationIcon.propTypes = {
  state: PropTypes.bool.isRequired,
}

export default StateIndicationIcon
