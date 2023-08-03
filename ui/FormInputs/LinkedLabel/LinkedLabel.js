import React from 'react'
import PropTypes from 'prop-types'

const LinkedLabel = ({ href, label }) => {
  if (href) {
    return (
      <a
        className='glossary_link'
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {label}
      </a>
    )
  }
  return label
}

LinkedLabel.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
}

LinkedLabel.defaultProps = {
  href: null,
  label: '',
}

export default LinkedLabel
