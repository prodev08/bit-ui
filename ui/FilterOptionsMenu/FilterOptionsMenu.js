import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'

import Button from 'ui/Button'

import FILTER_TYPES from './var/filterTypes'

const getFilterText = (filterType) => {
  switch (filterType) {
    case FILTER_TYPES.CONTAINS:
    default:
      return 'filter_options.contains'
    case FILTER_TYPES.EXACT:
      return 'filter_options.exact'
    case FILTER_TYPES.START:
      return 'filter_options.starts'
    case FILTER_TYPES.END:
      return 'filter_options.ends'
  }
}

const FilterOptionsMenu = ({
  className, onChange, t, value,
}) => {
  const classes = classNames('filter-options-menu', className)

  return (
    <Popover
      content={(
        <Menu className={classes} onChange={onChange}>
          <MenuItem text={t('filter_options.contains')} onClick={() => onChange(FILTER_TYPES.CONTAINS)} />
          <MenuItem text={t('filter_options.exact')} onClick={() => onChange(FILTER_TYPES.EXACT)} />
          <MenuItem text={t('filter_options.starts')} onClick={() => onChange(FILTER_TYPES.START)} />
          <MenuItem text={t('filter_options.ends')} onClick={() => onChange(FILTER_TYPES.END)} />
        </Menu>
      )}
      position={Position.BOTTOM_RIGHT}
    >
      <Button minimal className='filter-options-menu-button'>
        {t(getFilterText(value))}
      </Button>
    </Popover>
  )
}

FilterOptionsMenu.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

FilterOptionsMenu.defaultProps = {
  className: '',
  value: FILTER_TYPES.CONTAINS,
}

export default withTranslation()(FilterOptionsMenu)
