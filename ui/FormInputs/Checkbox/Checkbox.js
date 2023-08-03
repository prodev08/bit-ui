import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Checkbox as BlueprintCheckbox } from '@blueprintjs/core'
import _isUndefined from 'lodash/isUndefined'

import Tooltip from 'ui/Tooltip'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'

const Checkbox = ({
  checked,
  className,
  disabled,
  input,
  label,
  labelOnClick,
  meta: { error, submitFailed },
  name,
  onChange,
  t,
  tooltip,
  tristate,
}) => {
  const isChecked = (_isUndefined(checked))
    ? input.value
    : checked

  const isIndeterminate = tristate && _isUndefined(isChecked)

  const onChangeHandler = _isUndefined(onChange)
    ? input.onChange
    : (e) => {
      onChange(e)

      if (input && input.onChange) {
        input.onChange(e)
      }
    }

  const id = name || input.name

  const classes = classNames('custom-checkbox', className, {
    checked: isChecked,
  })

  const labelClickHandler = labelOnClick
    ? (e) => {
      e.preventDefault()
      labelOnClick(e)
    }
    : undefined

  const labelContent = (
    <span
      className='label'
      onClick={labelClickHandler}
    >
      {label}
    </span>
  )

  const checkboxContent = tooltip
    ? (
      <Tooltip content={t(tooltip)}>
        {labelContent}
      </Tooltip>
    )
    : labelContent

  return (
    <div className={classes}>
      <BlueprintCheckbox
        id={id}
        name={name}
        {...input}
        checked={!!isChecked}
        disabled={disabled}
        indeterminate={isIndeterminate}
        onChange={onChangeHandler}
      >
        {checkboxContent}
      </BlueprintCheckbox>
      {submitFailed && <ErrorLabel error={error} />}
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.node,
  labelOnClick: PropTypes.func,
  disabled: PropTypes.bool,
  meta: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  t: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  tristate: PropTypes.bool,
}

Checkbox.defaultProps = {
  checked: undefined,
  className: '',
  disabled: false,
  input: {},
  label: '',
  labelOnClick: undefined,
  meta: {},
  name: '',
  onChange: undefined,
  tristate: false,
  tooltip: '',
}

export default withTranslation()(Checkbox)
