import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Menu, MenuItem } from '@blueprintjs/core'
import { Suggest } from '@blueprintjs/select'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _first from 'lodash/first'
import _filter from 'lodash/filter'
import _replace from 'lodash/replace'
import _toLower from 'lodash/toLower'
import _includes from 'lodash/includes'
import _isFunction from 'lodash/isFunction'
import _keys from 'lodash/keys'
import _uniqueId from 'lodash/uniqueId'

import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import { getSortedCountries } from 'utils/getCountries'
import COUNTRY_CODES, { getISOByCountryCode } from 'var/countryCodes'

import CountryCodeItem from './CountryCode.item'

const getCode = ({ initial, residentCountry }) => {
  if (initial) {
    const phoneCode = _get(COUNTRY_CODES, [residentCountry, 'dial'], '')
    if (initial === phoneCode) { // if dial matches selected resident country, set it as default
      return residentCountry
    } // set first found
    return _keys(COUNTRY_CODES).find((code) => COUNTRY_CODES[code].dial === initial) || ''
  }

  return ''
}

const parseInput = (input = '') => _replace(_toLower(input), /[+-]/g, '')

const itemFilter = (input, item) => {
  const { name, dial } = item

  if (!dial) {
    return true
  }

  const parsedInput = parseInput(input)

  const hasPrecedingPlus = _first(input) === '+'
  const isIncludesDial = hasPrecedingPlus
    ? _includes(`+${dial}`, `+${parsedInput}`)
    : _includes(dial, parsedInput)

  const isIncludesName = _includes(name.toLowerCase(), parsedInput)

  return isIncludesDial || isIncludesName
}

const itemsEqual = (a, b) => a.code === b.code

const CountryCode = ({
  alwaysShowError,
  changePhoneCountryIso,
  label,
  className,
  disabled,
  input: { name, onChange },
  meta: {
    form,
    initial = '',
    error,
    submitFailed,
  },
  residentCountry,
  t,
}) => {
  const [input, setInput] = useState(() => {
    const code = getCode({ initial, residentCountry })
    return {
      code,
      dial: initial,
      iso: getISOByCountryCode(code),
    }
  })
  const [activeItem, setActiveItem] = useState({ code: input.code })
  const uniqueIdRef = useRef(_uniqueId())
  const queryRef = useRef('')

  const saveQuery = useCallback(() => {
    const { dial } = input
    if (_isFunction(onChange)) {
      const parsedInput = dial || parseInput(queryRef.current)
      onChange(parsedInput)
    }
  }, [input, onChange])

  useEffect(() => {
    saveQuery()
  }, [saveQuery])

  const onItemSelect = (item) => {
    const { code, dial, iso } = item
    setInput({ code, dial, iso })

    if (_isFunction(changePhoneCountryIso) && form) {
      changePhoneCountryIso(form, getISOByCountryCode(code))
    }
  }

  const inputValueRenderer = (data) => {
    const { code, dial } = data

    const value = dial || code

    return value ? `+${value}` : queryRef.current
  }

  const itemListRenderer = ({ filteredItems, renderItem, itemsParentRef }) => {
    const renderedItems = _map(_filter(filteredItems, (item) => item.dial), renderItem)

    return (
      <Menu ulRef={itemsParentRef}>
        {!renderedItems.length && <MenuItem disabled text={t('no_results')} />}
        {renderedItems}
      </Menu>
    )
  }

  const onQueryChange = (query) => {
    queryRef.current = query
  }

  const onActiveItemChange = (activeItem) => {
    setActiveItem(activeItem)
  }

  const countries = useMemo(() => {
    const countries = _map(getSortedCountries(), (country) => {
      const [code, name] = country

      return {
        name,
        ...COUNTRY_CODES[code],
        code,
        uniqueId: uniqueIdRef.current, // forces suggest item to rerender on component remount
      }
    })

    return [...countries, { code: '', name: '' }]
  }, [uniqueIdRef])

  const classes = classNames('country-code', 'bitfinex-select', 'custom-input-field-input', className)

  return (
    <div className='country-code-wrapper'>
      {label && <Label value={t(label)} />}
      <Suggest
        className={classes}
        inputValueRenderer={inputValueRenderer}
        items={countries}
        itemListRenderer={itemListRenderer}
        itemRenderer={CountryCodeItem}
        onItemSelect={onItemSelect}
        itemPredicate={itemFilter}
        itemsEqual={itemsEqual}
        disabled={disabled}
        onQueryChange={onQueryChange}
        defaultSelectedItem={input}
        activeItem={activeItem}
        onActiveItemChange={onActiveItemChange}
        inputProps={{
          className: classNames({ error: submitFailed && error }),
          name,
          onBlur: saveQuery,
          placeholder: t('search_placeholder'),
        }}
        popoverProps={{
          minimal: true,
          popoverClassName: 'bitfinex-select-menu',
          usePortal: false,
        }}
      />
      {(submitFailed || alwaysShowError) && <ErrorLabel error={error} />}
    </div>
  )
}

CountryCode.propTypes = {
  alwaysShowError: PropTypes.bool,
  changePhoneCountryIso: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    form: PropTypes.string,
    initial: PropTypes.string,
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }),
  residentCountry: PropTypes.string,
  t: PropTypes.func.isRequired,
}

CountryCode.defaultProps = {
  alwaysShowError: false,
  changePhoneCountryIso: undefined,
  label: '',
  className: '',
  disabled: false,
  input: {},
  residentCountry: '',
  meta: {},
}

export default withTranslation()(CountryCode)
