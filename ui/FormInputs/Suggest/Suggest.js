import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _map from 'lodash/map'
import _toLower from 'lodash/toLower'
import _includes from 'lodash/includes'
import { Menu, MenuItem } from '@blueprintjs/core'
import { Suggest as BptSuggest } from '@blueprintjs/select'

import SuggestItem from './Suggest.item'

const Suggest = ({
  name,
  autoFocus,
  className,
  inputProps,
  inputRef,
  items,
  onChange,
  onItemSelect,
  openOnKeyDown,
  value,
  placeholder,
  disabled,
  rightElement,
  itemRenderer,
  itemGetValue,
  itemFilter,
  t,
}) => {
  const itemListRenderer = ({
    filteredItems,
    renderItem,
    itemsParentRef,
  }) => {
    const renderedItems = _map(filteredItems, renderItem)

    return (
      <Menu ulRef={itemsParentRef}>
        {!renderedItems.length && <MenuItem disabled text={t('no_results')} />}
        {renderedItems}
      </Menu>
    )
  }

  const itemPredicate = (input, item) => {
    if (!input) {
      return true
    }
    if (itemFilter) {
      return itemFilter(item, input)
    }
    const value = itemGetValue(item)
    return _includes(_toLower(value), _toLower(input))
  }

  const inputValueRenderer = (item) => {
    const value = itemGetValue(item)
    return value
  }

  const itemSelect = (item) => {
    const value = itemGetValue(item)
    onItemSelect(value)
  }

  const classes = classNames(
    'suggest',
    'bitfinex-select',
    'custom-input-field-input',
    className,
  )

  return (
    <BptSuggest
      name={name}
      className={classes}
      items={items}
      inputValueRenderer={inputValueRenderer}
      itemListRenderer={itemListRenderer}
      itemRenderer={itemRenderer}
      onItemSelect={itemSelect}
      itemPredicate={itemPredicate}
      openOnKeyDown={openOnKeyDown}
      onQueryChange={onChange}
      query={value}
      selectedItem={null}
      disabled={disabled}
      closeOnSelect
      inputProps={{
        autoFocus,
        inputRef,
        placeholder,
        rightElement,
        ...inputProps,
      }}
      popoverProps={{
        minimal: true,
        popoverClassName: 'bitfinex-select-menu',
        usePortal: false,
      }}
    />
  )
}

Suggest.propTypes = {
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  inputProps: PropTypes.shape({
    onBlur: PropTypes.func,
  }),
  inputRef: PropTypes.object,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  openOnKeyDown: PropTypes.bool,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  rightElement: PropTypes.element,
  itemRenderer: PropTypes.func,
  itemGetValue: PropTypes.func,
  itemFilter: PropTypes.func,
  t: PropTypes.func.isRequired,
}

Suggest.defaultProps = {
  name: undefined,
  autoFocus: false,
  className: '',
  inputProps: {},
  inputRef: null,
  onChange: () => { },
  onItemSelect: () => { },
  openOnKeyDown: false,
  placeholder: '',
  disabled: false,
  rightElement: undefined,
  itemRenderer: SuggestItem,
  itemGetValue: (value) => value,
  itemFilter: undefined,
}

export default memo(Suggest)
