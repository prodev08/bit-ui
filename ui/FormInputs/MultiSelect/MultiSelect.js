import React, { memo, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _difference from 'lodash/difference'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _toLower from 'lodash/toLower'
import { Intent, MenuItem, MenuDivider } from '@blueprintjs/core'
import { MultiSelect as BptMultiSelect } from '@blueprintjs/select'

import Icons from 'icons'
import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'

const SELECT_ALL_ITEM = 'SELECT_ALL'

const MultiSelect = ({
  className,
  disabled,
  error,
  filterable,
  getItemLabel,
  items,
  label,
  name,
  onChange,
  placeholder,
  removeSelected,
  selectAllOption,
  selectedItems,
  selectedItemsExcluded,
}) => {
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const popoverProps = {
    minimal: true,
    popoverClassName: 'bitfinex-select-menu',
    onOpening: () => setIsOpen(true),
    onClosing: () => setIsOpen(false),
    usePortal: false,
  }

  const getItemText = (item) => {
    const selectAllItemSelected = item === SELECT_ALL_ITEM
    if (selectAllItemSelected) {
      return t('select_all')
    }
    if (getItemLabel) {
      return getItemLabel(item, { tag: false })
    }
    return item
  }

  const itemRenderer = (item, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers

    if (!matchesPredicate) {
      return null
    }
    const selectAllItemSelected = item === SELECT_ALL_ITEM
    if (selectAllItemSelected && _isEmpty(_difference(items, selectedItems))) {
      return null
    }
    if (!selectAllItemSelected && removeSelected && _includes(selectedItems, item)) {
      return null
    }
    const itemText = getItemText(item)

    return (
      <React.Fragment key={item}>
        <MenuItem
          active={active}
          intent={Intent.NONE}
          disabled={disabled}
          onClick={handleClick}
          text={itemText}
        />
        {selectAllItemSelected && <MenuDivider />}
      </React.Fragment>
    )
  }

  const itemPredicate = (query, item) => {
    const itemText = getItemText(item)
    return _includes(_toLower(itemText), _toLower(query))
  }

  const onItemRemove = (removedItem) => {
    if (disabled) {
      return
    }
    onChange(_filter(selectedItems, (item) => item !== removedItem))
  }

  const onItemSelect = (item) => {
    if (disabled) {
      return
    }
    if (item === SELECT_ALL_ITEM) {
      onChange(items)
    } else if (!_includes(selectedItems, item)) {
      onChange([...selectedItems, item].sort())
    } else {
      onItemRemove(item)
    }
  }

  const tagRenderer = (item) => (getItemLabel ? getItemLabel(item, { tag: true }) : item)

  const classes = classNames('select', 'multi-select', className, { error })
  const icon = isOpen ? <Icons.CHEVRON_UP /> : <Icons.CHEVRON_DOWN />

  const filteredItems = selectedItemsExcluded
    ? _filter(items, (item) => !_includes(selectedItems, item))
    : items
  const availableItems = selectAllOption ? [SELECT_ALL_ITEM, ...filteredItems] : filteredItems

  const tagInputProps = {
    className: 'bp3-button bitfinex-select-button',
    leftIcon: icon,
    inputProps: {
      autoComplete: 'off',
      name,
      onBlur: (e) => {
        e.target.setAttribute('readonly', true)
      },
      onFocus: (e) => {
        if (!filterable || disabled) {
          return
        }
        e.persist()
        setTimeout(() => e.target.removeAttribute('readonly'), 0)
      },
      readOnly: true,
    },
    minimal: true,
    disabled,
  }

  return (
    <div className={classes}>
      {label && <Label value={label} />}
      <BptMultiSelect
        className='bitfinex-select'
        items={availableItems}
        itemRenderer={itemRenderer}
        itemPredicate={itemPredicate}
        onItemSelect={onItemSelect}
        onRemove={onItemRemove}
        placeholder={placeholder}
        popoverProps={popoverProps}
        selectedItems={selectedItems}
        tagInputProps={tagInputProps}
        tagRenderer={tagRenderer}
        disabled={disabled}
        resetOnSelect
      />
      {error && <ErrorLabel error={error} />}
    </div>
  )
}

MultiSelect.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  filterable: PropTypes.bool,
  getItemLabel: PropTypes.func,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  removeSelected: PropTypes.bool,
  selectAllOption: PropTypes.bool,
  selectedItems: PropTypes.array.isRequired,
  selectedItemsExcluded: PropTypes.bool,
}

MultiSelect.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  filterable: true,
  getItemLabel: undefined,
  label: '',
  name: undefined,
  placeholder: '',
  removeSelected: false,
  selectAllOption: false,
  selectedItemsExcluded: false,
}

export default memo(MultiSelect)
