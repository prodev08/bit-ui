import React from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/FormInputs/Select'
import getCountries, { getSafeCountries } from 'utils/getCountries'

const ReduxCountrySelect = ({ safeOnly, ...otherProps }) => {
  const items = safeOnly
    ? getSafeCountries()
    : getCountries()

  const selectProps = {
    blankOption: true,
    isTranslationDisabled: true,
    items,
  }

  return (
    <Select
      {...otherProps}
      {...selectProps}
    />
  )
}

ReduxCountrySelect.propTypes = {
  safeOnly: PropTypes.bool,
}

ReduxCountrySelect.defaultProps = {
  safeOnly: false,
}

export default ReduxCountrySelect
