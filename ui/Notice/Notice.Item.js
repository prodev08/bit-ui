import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const NoticeItem = ({ iconClass, text }) => {
  const iconClasses = classNames('notice-item-icon', 'fa', iconClass)

  return (
    <div className='notice-item'>
      <i className={iconClasses} />
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

NoticeItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NoticeItem
