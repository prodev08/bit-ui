import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from 'ui/Tooltip'

const JSONFormat = ({ children, data, position }) => {
  if (!children) {
    return null
  }

  const formattedExtra = JSON.stringify(data, undefined, 2)

  return (
    <Tooltip
      boundary='window'
      content={<pre className='json-format'>{formattedExtra}</pre>}
      popoverClassName='json-format-popover'
      position={position}
      targetClassName='json-format-target'
    >
      {children}
    </Tooltip>
  )
}

JSONFormat.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  data: PropTypes.object,
  position: PropTypes.string,
}

JSONFormat.defaultProps = {
  children: undefined,
  data: {},
  position: 'auto',
}

export default JSONFormat
