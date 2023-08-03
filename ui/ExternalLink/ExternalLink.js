import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

const ExternalLink = ({
  className, onClick: onClickProp, src, title,
}) => {
  const openNewWindow = () => {
    const w = window.open(src, '_blank', 'location=yes, centerscreen=yes')
    if (title) {
      w.document.title = title
    }
  }

  const onClick = (e) => {
    e.preventDefault()

    if (_isFunction(onClickProp)) {
      onClickProp()
    }

    openNewWindow()
  }

  /* eslint-disable jsx-a11y/anchor-has-content */
  const classes = classNames('fa fa-external-link', className)

  return (
    <a
      className={classes}
      href={src}
      onClick={onClick}
    />
  )
}

ExternalLink.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
}

ExternalLink.defaultProps = {
  className: '',
  onClick: undefined,
  title: '',
}

export default ExternalLink
