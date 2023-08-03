import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _memoize from 'lodash/memoize'
import { Classes, MenuItem } from '@blueprintjs/core'

import memoizeResolver from 'utils/memoizeResolver'

const CountryCodeItem = (
  {
    code, name, dial, iso,
  },
  { handleClick, modifiers = {} },
) => {
  const { active } = modifiers

  const itemClasses = classNames('country-code-item', {
    [Classes.ACTIVE]: active,
  })
  const flagClasses = classNames('country-code-item-flag', iso)

  const itemMarkup = (
    <>
      <span className={flagClasses} />
      <span className='country-code-item-country'>{name}</span>
      <span className='country-code-item-dial'>{dial && `+${dial}`}</span>
    </>
  )

  return (
    <MenuItem
      text={itemMarkup}
      className={itemClasses}
      key={code}
      onClick={handleClick}
    />
  )
}

CountryCodeItem.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dial: PropTypes.string.isRequired,
  iso: PropTypes.string.isRequired,
}

export default _memoize(CountryCodeItem, memoizeResolver)
