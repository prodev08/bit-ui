import React from 'react'
import PropTypes from 'prop-types'

import { formatDate } from 'utils/dates'
import DATE_FORMATS from 'utils/dates/formats'

const SignatureDate = (props) => {
  const { input } = props
  const { value } = input
  const formattedDate = formatDate(value, DATE_FORMATS.EXCEL_FORMAT)

  return (
    <span>{formattedDate}</span>
  )
}

SignatureDate.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
}

export default SignatureDate
