import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

const SanitizedHtml = ({ dirty }) => (
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dirty) }} />
)

SanitizedHtml.propTypes = {
  dirty: PropTypes.string,
}

SanitizedHtml.defaultProps = {
  dirty: '',
}

export default SanitizedHtml
