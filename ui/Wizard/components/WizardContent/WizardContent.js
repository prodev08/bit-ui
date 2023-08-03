import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const WizardContent = ({
  className,
  children,
}) => {
  const classes = classNames(
    'wizard-content',
    className,
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

WizardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

WizardContent.defaultProps = {
  className: undefined,
}

export default WizardContent
