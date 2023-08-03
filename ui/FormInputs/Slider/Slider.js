import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Slider as BlueprintSlider } from '@blueprintjs/core'
import _isString from 'lodash/isString'
import _toNumber from 'lodash/toNumber'

import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'

const Slider = ({
  className,
  label,
  value,
  name,
  disabled,
  showLabel,
  alwaysShowError,
  onChange,
  meta,
  input,
  missingValueMessage,
  vertical,
  min,
  max,
  stepSize,
  labelStepSize,
  labelRenderer,
  showTrackFill,
}) => {
  const { error, submitFailed } = meta

  const {
    name: inputName,
    value: inputValue,
    onChange: inputOnChange,
  } = input

  const editorName = inputName || name
  const editValue = inputValue || value
  const editorValue = _isString(editValue) ? _toNumber(editValue) : editValue

  const showError = (alwaysShowError || submitFailed) && error
  const showWarning = !showError && missingValueMessage

  const classes = classNames(
    'custom-slider',
    className,
    {
      disabled,
      error: showError,
      warning: showWarning,
    },
  )

  const handleOnChange = (newValue) => {
    if (inputOnChange) {
      inputOnChange(newValue)
    } else {
      onChange(newValue)
    }
  }

  return (
    <div className={classes}>
      {showLabel && <Label value={label} />}
      <BlueprintSlider
        name={editorName}
        value={editorValue}
        vertical={vertical}
        min={min}
        max={max}
        stepSize={stepSize}
        labelStepSize={labelStepSize}
        labelRenderer={labelRenderer}
        showTrackFill={showTrackFill}
        disabled={disabled}
        onChange={handleOnChange}
      />
      {showError && <ErrorLabel error={error} />}
      {showWarning && <WarningLabel warning={missingValueMessage} />}
    </div>
  )
}

Slider.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  alwaysShowError: PropTypes.bool,
  onChange: PropTypes.func,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }),
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }),
  missingValueMessage: PropTypes.string,
  vertical: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  showTrackFill: PropTypes.bool,
  stepSize: PropTypes.number,
  labelStepSize: PropTypes.number,
  labelRenderer: PropTypes.func,
}

Slider.defaultProps = {
  className: '',
  label: '',
  value: 0,
  name: undefined,
  disabled: false,
  showLabel: true,
  alwaysShowError: false,
  onChange: () => { },
  meta: {},
  input: {},
  missingValueMessage: undefined,
  vertical: false,
  min: 0,
  max: 10,
  stepSize: 1,
  labelStepSize: 10,
  labelRenderer: undefined,
  showTrackFill: true,
}

export default withMissingInputValueMessage(Slider)
