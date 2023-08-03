import React, {
  useMemo, useRef, useState,
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import _find from 'lodash/find'
import _includes from 'lodash/includes'
import _toLower from 'lodash/toLower'
import _isEmpty from 'lodash/isEmpty'
import _isUndefined from 'lodash/isUndefined'
import _isEqual from 'lodash/isEqual'
import _get from 'lodash/get'
import { Button, MenuItem } from '@blueprintjs/core'
import { Select as BlueprintSelect } from '@blueprintjs/select'

import Icons from 'icons'
import Label from 'ui/FormInputs/Label'
import ErrorLabel from 'ui/FormInputs/ErrorLabel'
import WarningLabel from 'ui/FormInputs/WarningLabel'
import withMissingInputValueMessage from 'HOC/withMissingInputValueMessage'
import onKeyDownHelper from '../utils/onKeyDownHelper'

import {
  propTypes,
  defaultProps,
} from './Select.props'
import {
  findMatchOnKeyDown,
  getItemTranslation,
  getItemsTranslations,
  getItems,
  getFilteredItems,
  getDefaultActiveItem,
} from './utils'

const Select = ({
  alwaysShowError,
  blankOption,
  className,
  meta,
  input,
  isTranslationDisabled,
  showLabel,
  label,
  items,
  name,
  onChange,
  value,
  selectedItemExcluded,
  disabled,
  missingValueMessage,
  placeholder,
  minimal,
  usePortal,
  filterable,
  rightElement,
  onEnterKey,
  submitOnEnterKey,
}) => {
  const { t } = useTranslation()

  const {
    name: inputName,
    value: inputValue,
    onChange: inputOnChange,
    onFocus: inputOnFocus,
  } = input
  const editValue = _isUndefined(inputValue)
    ? value
    : inputValue

  const selectItems = useMemo(
    () => getItems(blankOption, items),
    [blankOption, items],
  )
  const itemsTranslations = useMemo(
    () => getItemsTranslations(selectItems, isTranslationDisabled, t),
    [selectItems, isTranslationDisabled, t],
  )

  const defaultActiveItem = getDefaultActiveItem(selectItems, meta, editValue)
  const [activeItem, setActiveItem] = useState(defaultActiveItem)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const buttonRef = useRef()

  const onTranslate = (item) => {
    const { isTranslationDisabled: itemTranslationDisabled } = item
    const isTransDisabled = itemTranslationDisabled || isTranslationDisabled
    return getItemTranslation(item, isTransDisabled, t)
  }

  const itemRenderer = (item, itemProps) => {
    const { index, modifiers, handleClick } = itemProps
    const { active } = modifiers
    const {
      value: itemValue, disabled, id, style,
    } = item
    const text = onTranslate(item)

    return (
      <MenuItem
        active={active}
        disabled={disabled}
        key={id || (itemValue === '' ? index : itemValue)}
        onClick={handleClick}
        style={style}
        text={text}
      />
    )
  }

  const itemPredicate = (query, item) => {
    if (_isEmpty(query)) {
      return true
    }
    const text = onTranslate(item)
    return _includes(_toLower(text), _toLower(query))
  }

  const onItemSelect = (item, e) => {
    const { value } = item

    e.target.name = inputName || name
    e.target.type = 'select'
    e.target.value = item

    if (inputOnChange) {
      inputOnChange(value)
    }
    onChange(value, e)

    if (filterable) {
      setQuery('')
      setIsOpen(false)
    }
  }

  const onActiveItemChange = (activeItem) => {
    setActiveItem(activeItem)
  }

  const onQueryChange = (query) => {
    setQuery(query)
  }

  const onToggle = (nextOpenState) => {
    setIsOpen(nextOpenState)
  }

  const onFocus = () => {
    if (inputOnFocus) {
      inputOnFocus()
    }
  }

  const onKeyDown = (e) => {
    onKeyDownHelper({
      onEnterKey,
      submitOnEnterKey,
      meta,
    }, e)

    const { keyCode } = e
    if (keyCode === 27) {
      setIsOpen(false)
    }

    const selectItems = getItems(blankOption, items)
    const selectedItemIndex = selectItems.findIndex(
      ({ value }) => _isEqual(value, editValue),
    )

    const matchingIndex = findMatchOnKeyDown(e, {
      indexFrom: selectedItemIndex,
      items: itemsTranslations,
      self: this,
    })

    if (matchingIndex !== -1) {
      const match = _get(selectItems, matchingIndex)
      onItemSelect(match, e)
      onActiveItemChange(match)
    }
  }

  const onPopoverRef = (popover) => {
    const { current: button } = buttonRef
    if (usePortal && popover && button) {
      const { offsetWidth } = button
      popover.style.width = `${offsetWidth}px`
    }
  }

  const selectedItem = _find(
    selectItems,
    ({ value }) => _isEqual(value, editValue),
  ) || {}
  const {
    value: selectedItemValue,
    label: selectedItemLabel,
  } = selectedItem
  const itemsData = selectedItemExcluded
    ? getFilteredItems(selectItems, editValue)
    : selectItems

  // button should have an empty span so the icon wouldn't render on the left side
  const buttonText = selectedItemLabel
    ? onTranslate(selectedItem)
    : selectedItemValue || placeholder || ' '
  const buttonIcon = isOpen
    ? <Icons.CHEVRON_UP />
    : <Icons.CHEVRON_DOWN />

  const { error, submitFailed } = meta
  const showError = (alwaysShowError || submitFailed) && error
  const showWarning = !showError && missingValueMessage
  const classes = classNames('select', className, {
    disabled,
    error: showError,
    warning: showWarning,
  })

  return (
    <div className={classes}>
      {showLabel && <Label value={label} />}
      <BlueprintSelect
        autoFocus={false}
        activeItem={activeItem}
        className='bitfinex-select'
        filterable={filterable}
        query={query}
        disabled={disabled || _isEmpty(selectItems)}
        items={itemsData}
        itemRenderer={itemRenderer}
        itemPredicate={itemPredicate}
        onItemSelect={onItemSelect}
        onActiveItemChange={onActiveItemChange}
        onQueryChange={onQueryChange}
        resetOnQuery={false}
        popoverProps={{
          isOpen,
          usePortal,
          minimal: true,
          onInteraction: onToggle,
          popoverRef: onPopoverRef,
          popoverClassName: 'bitfinex-select-menu',
          boundary: usePortal ? 'window' : 'scrollParent',
        }}
        inputProps={{
          placeholder: t('search_placeholder'),
        }}
      >
        <Button
          className='bitfinex-select-button'
          name={inputName || name}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          text={buttonText}
          rightIcon={rightElement || buttonIcon}
          minimal={minimal}
          elementRef={buttonRef}
        />
      </BlueprintSelect>
      {showError && <ErrorLabel error={error} />}
      {showWarning && <WarningLabel warning={missingValueMessage} />}
    </div>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default withMissingInputValueMessage(Select)
