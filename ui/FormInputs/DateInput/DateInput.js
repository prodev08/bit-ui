import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { Position } from '@blueprintjs/core'
import { DateInput as BptDateInput } from '@blueprintjs/datetime'
import _isString from 'lodash/isString'
import _replace from 'lodash/replace'

import Icon from 'icons'
import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import { MIN_DATE, MAX_DATE, DATE_FORMATS } from 'utils/dates'

const DateInput = ({
  onChange,
  className,
  dateFormat,
  date,
  disabled,
  error,
  label,
  name,
  placeholder,
  showLabel,
  timestamp,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (date) => {
    if (!date) {
      return null
    }

    if (timestamp) {
      return new Date(date)
    }

    const formattedDate = _isString(date) ? _replace(date, ' ', 'T') : date

    return moment(formattedDate).toDate()
  }

  const onChangeHandler = (date) => {
    if (!date || date.toString() === 'Invalid Date') {
      return onChange(timestamp ? undefined : '')
    }

    if (timestamp) {
      return onChange(date.valueOf())
    }

    const formattedDate = moment(date).format(DATE_FORMATS.FULL_DATE)

    return onChange(formattedDate)
  }

  const onToggle = (isOpen) => {
    setIsOpen(isOpen)
  }

  const classes = classNames('date-input', className, { disabled, error })
  const icon = isOpen
    ? <Icon.CHEVRON_UP />
    : <Icon.CHEVRON_DOWN />

  const value = formatDate(date)

  return (
    <div className={classes}>
      {showLabel && <Label value={label} />}
      <BptDateInput
        disabled={disabled}
        value={value}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        formatDate={(date) => moment(date).format(dateFormat)}
        inputProps={{
          autoComplete: 'off',
          name,
          onBlur: (e) => e.target.setAttribute('readonly', true),
          onFocus: (e) => {
            e.persist()
            setTimeout(() => e.target.removeAttribute('readonly'), 0)
          },
          placeholder,
          readOnly: true,
          rightElement: icon,
        }}
        onChange={onChangeHandler}
        parseDate={(str) => {
          const date = moment(
            str,
            [
              DATE_FORMATS.EXCEL_FORMAT,
              DATE_FORMATS.SHORT_DATE,
              DATE_FORMATS.STANDARD_DATE_SHORT,
            ],
          )
          if (date.isAfter(MIN_DATE) && date.isBefore(MAX_DATE)) {
            return date.toDate()
          }
          return moment(null).toDate()
        }}
        popoverProps={{
          popoverClassName: 'date-input-popover',
          minimal: true,
          onOpening: () => onToggle(true),
          onClosing: () => onToggle(false),
          position: Position.BOTTOM_LEFT,
        }}
      />
      {error && !disabled && <ErrorLabel error={error} />}
    </div>
  )
}

DateInput.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  timestamp: PropTypes.bool,
}

DateInput.defaultProps = {
  className: '',
  date: null,
  dateFormat: DATE_FORMATS.STANDARD_DATE_SHORT,
  disabled: false,
  error: '',
  label: '',
  name: '',
  placeholder: '',
  showLabel: true,
  timestamp: false,
}

export default memo(DateInput)
