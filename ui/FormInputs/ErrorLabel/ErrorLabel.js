import React from 'react'
import PropTypes from 'prop-types'

import translateMessage from 'utils/validations/translateMessage'

const ErrorLabel = ({ className, error }) => {
  if (!error) {
    return null
  }

  const errorMessage = translateMessage(error)

  return (
    <div className={`label label--error ${className}`} title={errorMessage}>
      {errorMessage}
    </div>
  )
}

ErrorLabel.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
}

ErrorLabel.defaultProps = {
  className: '',
  error: '',
}

export default ErrorLabel
