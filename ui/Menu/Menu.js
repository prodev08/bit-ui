import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'

import Icon from 'icons'

const Menu = ({
  items,
  onItemSelect,
  getItemLabel,
  getItemDescription,
  getItemExpandedContent,
  isItemSelected,
  isItemHighlighted,
  translateLabels,
  translateDescriptions,
  showRadioButtons,
  showCheckboxes,
  showChevronIcons,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('menu', className)}>
      {_map(items, ({
        value,
        label = getItemLabel(value),
        description = getItemDescription(value),
        expandedContent = getItemExpandedContent(value),
        selected = isItemSelected(value),
        highlighted = isItemHighlighted(value),
        showExpandedContent = expandedContent && selected,
      }) => (
        <div
          key={value}
          className={classNames(
            'menu-item',
            { 'menu-item-selected': selected && !showRadioButtons && !showCheckboxes },
            { 'menu-item-highlighted': highlighted },
            { 'menu-item-expanded': showExpandedContent },
          )}
          onClick={() => onItemSelect(value)}
        >
          {showRadioButtons && (
            <div className={classNames(
              'menu-item-radio',
              { 'menu-item-radio-selected': selected })}
            />
          )}
          {showCheckboxes && (
            <div className='menu-item-checkbox'>
              {selected && <Icon.CHECKMARK_GREEN />}
            </div>
          )}
          <div className='menu-item-text'>
            <div className='menu-item-label'>
              {translateLabels ? t(label) : label}
            </div>
            {description && (
              <div className='menu-item-description'>
                {translateDescriptions ? t(description) : description}
              </div>
            )}
          </div>
          <div className='menu-item-spacer' />
          {showChevronIcons && (
            <>
              {!expandedContent && (
                <Icon.CHEVRON_RIGHT className='menu-item-icon' />
              )}
              {expandedContent && !selected && (
                <Icon.CHEVRON_DOWN_LARGE className='menu-item-icon' />
              )}
              {expandedContent && selected && (
                <Icon.CHEVRON_UP_LARGE className='menu-item-icon' />
              )}
            </>
          )}
          {showExpandedContent && (
            <div
              className='menu-item-expanded-content'
              onClick={(e) => e.stopPropagation()}
            >
              {expandedContent}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const MenuItemProps = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.node,
  description: PropTypes.node,
  expandedContent: PropTypes.node,
  selected: PropTypes.bool,
  highlighted: PropTypes.bool,
})

Menu.propTypes = {
  items: PropTypes.arrayOf(MenuItemProps).isRequired,
  onItemSelect: PropTypes.func,
  getItemLabel: PropTypes.func,
  getItemDescription: PropTypes.func,
  getItemExpandedContent: PropTypes.func,
  isItemSelected: PropTypes.func,
  isItemHighlighted: PropTypes.func,
  translateLabels: PropTypes.bool,
  translateDescriptions: PropTypes.bool,
  showRadioButtons: PropTypes.bool,
  showCheckboxes: PropTypes.bool,
  showChevronIcons: PropTypes.bool,
  className: PropTypes.string,
}

Menu.defaultProps = {
  onItemSelect: () => { },
  getItemLabel: () => '',
  getItemDescription: () => '',
  getItemExpandedContent: () => '',
  isItemSelected: () => false,
  isItemHighlighted: () => false,
  translateLabels: false,
  translateDescriptions: false,
  showRadioButtons: false,
  showCheckboxes: false,
  showChevronIcons: true,
  className: '',
}

export default Menu
