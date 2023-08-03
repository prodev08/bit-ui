import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { fetchPlaceAction, fetchPlacesAutocompleteAction } from 'store/actions/places.actions'

import Autocomplete from 'ui/Autocomplete'
import Geolocation from 'components/Services/Geolocation'

const GeolocationInput = ({
  disabled,
  label,
  onChange,
  onLocationChange,
}) => {
  const [value, setValue] = useState('')
  const [autocomplete, setAutocomplete] = useState([])
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const setAutocompleteData = (autocompleteInput) => {
    setAutocomplete(autocompleteInput)
  }

  const onChangeHandler = (value) => {
    setValue(value)

    if (value) {
      dispatch(fetchPlacesAutocompleteAction({
        callback: setAutocompleteData,
        input: value,
      }))
    } else {
      setAutocomplete([])
    }

    onChange()
  }

  const onFocus = () => {
    Geolocation.geolocate()
  }

  const onOptionPick = (place_id) => {
    dispatch(fetchPlaceAction({
      callback: onLocationChange,
      place_id,
    }))
  }

  return (
    <div className='custom-input-field'>
      <div className='custom-input-field-input'>
        <Autocomplete
          className=''
          disabled={disabled}
          inputClass='bp3-input'
          label={label || t('geolocation_placeholder')}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onOptionPick={onOptionPick}
          options={autocomplete}
          value={value}
        />
      </div>
    </div>
  )
}

GeolocationInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onLocationChange: PropTypes.func.isRequired,
}

GeolocationInput.defaultProps = {
  disabled: false,
  label: '',
  onChange: () => {},
}

export default GeolocationInput
