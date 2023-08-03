import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Panel = ({
  title,
  actions,
  className,
  children,
  footer,
}) => (
  <div className={classNames('panel', className)}>
    {(title || actions) && (
      <>
        <div className='panel-header'>
          {title && (
            <div className='panel-title'>
              {title}
            </div>
          )}
          {actions && (
            <div className='panel-actions'>
              {actions}
            </div>
          )}
        </div>
        <div className='panel-divider' />
      </>
    )}
    <div className='panel-body'>
      {children}
    </div>
    {footer && (
      <>
        <div className='panel-divider' />
        <div className='panel-footer'>
          {footer}
        </div>
      </>
    )}
  </div>
)

Panel.propTypes = {
  title: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
}

Panel.defaultProps = {
  title: undefined,
  actions: undefined,
  className: undefined,
  children: undefined,
  footer: undefined,
}

export default memo(Panel)
