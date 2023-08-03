import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _times from 'lodash/times'

const CompletionSteps = ({
  step,
  steps,
}) => {
  const { t } = useTranslation()

  return (
    <div className='completion-steps'>
      <div className='completion-steps-lines'>
        {_times(steps.length - 1, (index) => {
          const classes = classNames('completion-steps-lines-line', {
            'completion-steps-lines-line--active': index + 1 < step,
          })

          return <div className={classes} key={index} />
        })}
      </div>
      <div className='completion-steps-items'>
        {steps.map((stepLabel, index) => {
          const classes = classNames('completion-steps-items-step', {
            'completion-steps-items-step--active': step === index + 1,
            'completion-steps-items-step--completed': step > index + 1,
          })

          return (
            <div className={classes} key={index}>
              <div className='completion-steps-items-step-circle'>{index + 1}</div>
              <div className='completion-steps-items-step-label'>
                {t(stepLabel)}
              </div>
              <div className='completion-steps-items-step-label--hidden'>
                {t(stepLabel)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

CompletionSteps.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default memo(CompletionSteps)
