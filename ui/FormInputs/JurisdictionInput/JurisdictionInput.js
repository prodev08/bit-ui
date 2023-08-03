/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Suggest } from '@blueprintjs/select'
import { Menu, MenuItem } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'
import _toLower from 'lodash/toLower'

import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import getCountries from 'utils/getCountries'

const JurisdictionInput = ({
  alwaysShowError,
  initialValue,
  className,
  disabled,
  input,
  meta,
  onQueryChange,
  onSelect,
}) => {
  const [jurisdiction, setJurisdiction] = useState(initialValue)
  const { t } = useTranslation()
  const { onChange, name } = input
  const { submitFailed, error } = meta
  const items = getCountries()

  const handleChange = (e) => {
    setJurisdiction(e)
    onQueryChange({ label: e })
    onChange(e)
  }

  const onItemSelect = (e) => {
    const { label } = e
    setJurisdiction(label)
    onSelect(e)
  }

  const classes = classNames('tin-code', 'bitfinex-select', 'custom-input-field-input', className)

  const itemRenderer = ({ value, label }, { modifiers, handleClick }) => (
    <MenuItem
      active={modifiers.active}
      onClick={handleClick}
      text={label}
      key={value}
    />
  )
  const inputValueRenderer = (inputValue) => inputValue.label

  const itemListRenderer = ({ filteredItems, itemsParentRef, renderItem }) => {
    const render = _map(filteredItems, (item) => renderItem(item))
    return (
      <Menu ulRef={itemsParentRef}>
        {!render.length && <MenuItem disabled text={t('no_results')} />}
        {render}
      </Menu>
    )
  }

  const filterItems = (query, { label }, _index, exactMatch) => {
    const Label = _toLower(label)
    const queryString = _toLower(query)

    if (exactMatch) {
      return Label === query
    }
    return Label.indexOf(queryString) >= 0
  }

  return (
    <div className='jurisdiction'>
      <Suggest
        className={classes}
        name={name}
        items={items}
        disabled={disabled}
        inputValueRenderer={inputValueRenderer}
        itemRenderer={itemRenderer}
        itemListRenderer={itemListRenderer}
        itemPredicate={filterItems}
        onItemSelect={onItemSelect}
        onQueryChange={handleChange}
        query={jurisdiction}
      />
      {(submitFailed || alwaysShowError) && <ErrorLabel error={error} />}
    </div>
  )
}

JurisdictionInput.propTypes = {
  alwaysShowError: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  initialValue: PropTypes.string,
  onSelect: PropTypes.func,
  onQueryChange: PropTypes.func,
}

JurisdictionInput.defaultProps = {
  alwaysShowError: false,
  className: '',
  disabled: false,
  input: {},
  meta: {},
  initialValue: '',
  onSelect: () => {},
  onQueryChange: () => {},
}

export default JurisdictionInput
