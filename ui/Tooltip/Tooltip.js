import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip as BptTooltip } from '@blueprintjs/core'

const Tooltip = ({
  boundary,
  children,
  className,
  content,
  hoverOpenDelay,
  openOnTargetFocus,
  popoverClassName,
  position,
  targetClassName,
  targetTagName,
  usePortal,
  wrapperTagName,
}) => {
  if (!content || !children) {
    return children
  }

  return (
    <BptTooltip
      boundary={boundary}
      className={className}
      content={content}
      hoverOpenDelay={hoverOpenDelay}
      openOnTargetFocus={openOnTargetFocus}
      popoverClassName={popoverClassName}
      position={position}
      targetClassName={targetClassName}
      targetTagName={targetTagName}
      usePortal={usePortal}
      wrapperTagName={wrapperTagName}
    >
      {children}
    </BptTooltip>
  )
}

Tooltip.propTypes = {
  boundary: PropTypes.oneOf(['scrollParent', 'viewport', 'window']),
  children: PropTypes.any,
  className: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  hoverOpenDelay: PropTypes.number,
  openOnTargetFocus: PropTypes.bool,
  popoverClassName: PropTypes.string,
  position: PropTypes.oneOf([
    'auto',
    'auto-end',
    'auto-start',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'left-bottom',
    'left-top',
    'right',
    'right-bottom',
    'right-top',
    'top',
    'top-left',
    'top-right',
  ]),
  targetClassName: PropTypes.string,
  targetTagName: PropTypes.oneOf(['div']), // based on usage in the project
  usePortal: PropTypes.bool,
  wrapperTagName: PropTypes.oneOf(['div']), // based on usage in the project
}

Tooltip.defaultProps = {
  boundary: undefined,
  children: '',
  className: '',
  content: '',
  hoverOpenDelay: undefined,
  openOnTargetFocus: undefined,
  popoverClassName: undefined,
  position: undefined,
  targetClassName: undefined,
  targetTagName: undefined,
  usePortal: undefined,
  wrapperTagName: undefined,
}

export default Tooltip
