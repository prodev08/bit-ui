import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import Select from 'ui/FormInputs/Select'
import getCountries, { getSafeCountries } from 'utils/getCountries'
import CountryEditLabel from './CountryEditLabel'

const CountrySelect = ({
  alwaysShowError,
  className,
  disabled,
  name,
  label,
  onChange,
  safeOnly,
  submitOnEnterKey,
  value,
  withoutForm,
  filterable,
  rightElement,
  showCountryEditLabel,
  isAutoDetectedCountry,
  usePortal,
}) => {
  const items = safeOnly
    ? getSafeCountries()
    : getCountries()

  const selectRightElement = showCountryEditLabel
    ? (
      <CountryEditLabel
        isAutoDetectedCountry={isAutoDetectedCountry}
      />
    )
    : rightElement

  const selectProps = {
    alwaysShowError,
    blankOption: true,
    className,
    disabled,
    isTranslationDisabled: true,
    items,
    label,
    name,
    submitOnEnterKey,
    value,
    filterable,
    usePortal,
    rightElement: selectRightElement,
  }

  if (withoutForm) {
    return (
      <Select
        {...selectProps}
        onChange={onChange}
      />
    )
  }

  return (
    <Field
      component={Select}
      {...selectProps}
      props={{ onChange }}
    />
  )
}

CountrySelect.propTypes = {
  alwaysShowError: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  safeOnly: PropTypes.bool,
  submitOnEnterKey: PropTypes.bool,
  value: PropTypes.string,
  withoutForm: PropTypes.bool,
  filterable: PropTypes.bool,
  rightElement: PropTypes.node,
  showCountryEditLabel: PropTypes.bool,
  isAutoDetectedCountry: PropTypes.bool,
  usePortal: PropTypes.bool,
}

CountrySelect.defaultProps = {
  alwaysShowError: false,
  className: '',
  disabled: false,
  label: '',
  onChange: () => { },
  safeOnly: false,
  submitOnEnterKey: false,
  value: undefined,
  withoutForm: false,
  filterable: true,
  rightElement: undefined,
  showCountryEditLabel: false,
  isAutoDetectedCountry: false,
  usePortal: false,
}

export default CountrySelect
