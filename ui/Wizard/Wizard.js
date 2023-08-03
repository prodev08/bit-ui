import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Steps from 'ui/Steps'

const Wizard = ({
  numberOfSteps,
  activeStep,
  isHeaderHidden,
  isMobileFullScreen,
  className,
  children,
}) => {
  const classes = classNames(
    'wizard',
    className,
    {
      'wizard-without-header': isHeaderHidden,
      'wizard-mobile-full-screen': isMobileFullScreen,
    },
  )

  return (
    <div className={classes}>
      {!isHeaderHidden && (
        <div className='wizard-header'>
          <Steps
            numberOfSteps={numberOfSteps}
            activeStep={activeStep}
          />
        </div>
      )}
      {children}
    </div>
  )
}

Wizard.propTypes = {
  numberOfSteps: PropTypes.number,
  activeStep: PropTypes.number,
  isHeaderHidden: PropTypes.bool,
  isMobileFullScreen: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

Wizard.defaultProps = {
  numberOfSteps: 1,
  activeStep: 1,
  isHeaderHidden: false,
  isMobileFullScreen: false,
  className: undefined,
  children: undefined,
}

export default Wizard
