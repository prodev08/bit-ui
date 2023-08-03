import React from 'react'
import PropTypes from 'prop-types'

import translateMessage from 'utils/validations/translateMessage'

const WarningLabel = ({ warning }) => {
  if (!warning) {
    return null
  }

  const warningMessage = translateMessage(warning)

  return (
    <div className='label label--warning' title={warningMessage}>
      {warningMessage}
    </div>
  )
}

WarningLabel.propTypes = {
  warning: PropTypes.string,
}

WarningLabel.defaultProps = {
  warning: '',
}

export default WarningLabel
