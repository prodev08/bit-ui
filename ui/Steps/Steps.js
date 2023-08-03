import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _map from 'lodash/map'
import _range from 'lodash/range'
import _isEqual from 'lodash/isEqual'
import _gt from 'lodash/gt'
import _last from 'lodash/last'

import Icon from 'icons'

const Steps = ({
  numberOfSteps,
  activeStep,
}) => {
  const stepItems = useMemo(
    () => _range(1, numberOfSteps + 1),
    [numberOfSteps],
  )
  return (
    <div className='steps'>
      {_map(stepItems, (step) => {
        const isActive = _isEqual(activeStep, step)
        const isCompleted = _gt(activeStep, step)
        const isLast = _isEqual(_last(stepItems), step)
        return (
          <React.Fragment key={step}>
            <div className={classNames('steps-item', {
              'steps-item-active': isActive,
              'steps-item-completed': isCompleted,
            })}
            >
              {isCompleted
                ? <Icon.CHECKMARK_GREEN />
                : (<span>{step}</span>)}
            </div>
            {!isLast && (
              <div className={classNames('steps-line', {
                'steps-line-completed': isCompleted,
              })}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

Steps.propTypes = {
  numberOfSteps: PropTypes.number.isRequired,
  activeStep: PropTypes.number,
}

Steps.defaultProps = {
  activeStep: 1,
}

export default Steps
