import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Select from 'ui/FormInputs/Select'
import queryLimitItems from 'ui/FormInputs/Select/Items/queryLimit'

const QueryLimit = ({
  limit,
  onChange,
}) => {
  const classes = classNames('query-limit', { 'query-limit--3d': limit > 99 })

  return (
    <Select
      value={limit}
      onChange={onChange}
      className={classes}
      items={queryLimitItems}
    />
  )
}

QueryLimit.propTypes = {
  limit: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default memo(QueryLimit)
