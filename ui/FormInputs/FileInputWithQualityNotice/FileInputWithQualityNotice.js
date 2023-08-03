import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import DocumentQualityNotice from 'ui/DocumentQualityNotice'
import FileInput from 'ui/FormInputs/FileInput'

const FileInputWithQualityNotice = (props) => {
  const { input } = props

  const document = _get(input, 'value') || {}

  return (
    <div>
      <DocumentQualityNotice document={document} />
      <FileInput {...props} />
    </div>
  )
}

FileInputWithQualityNotice.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
}

export default FileInputWithQualityNotice
