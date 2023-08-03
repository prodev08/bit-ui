import React from 'react'
import classNames from 'classnames'
import { Classes, MenuItem } from '@blueprintjs/core'
import _memoize from 'lodash/memoize'

import memoizeResolver from 'utils/memoizeResolver'

const SuggestItem = (item, { handleClick, modifiers = {} }) => {
  const { active } = modifiers

  const itemClasses = classNames('suggest-item', {
    [Classes.ACTIVE]: active,
  })

  return (
    <MenuItem
      className={itemClasses}
      key={item}
      onClick={handleClick}
      text={item}
    />
  )
}

export default _memoize(SuggestItem, memoizeResolver)
