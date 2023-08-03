import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _castArray from 'lodash/castArray'
import _get from 'lodash/get'
import _map from 'lodash/map'

import Tooltip from 'ui/Tooltip'

const Label = ({
  active, className, tooltip, value,
}) => {
  if (!value) {
    return null
  }

  const classes = classNames('label', className, { active })

  return (
    <div className={classes}>
      {_map(_castArray(value), (val, index) => {
        // avoid triggering tooltip of a tooltip
        const name = _get(val, ['type', 'name'])
        if (name === 'Tooltip') {
          return <span key={index}>{val}</span>
        }

        return (
          <Tooltip content={tooltip && val} key={index} openOnTargetFocus={false}>
            {val}
          </Tooltip>
        )
      })}
    </div>
  )
}

Label.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  tooltip: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

Label.defaultProps = {
  active: false,
  className: '',
  tooltip: true,
  value: '',
}

export default memo(Label)
