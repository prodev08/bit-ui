import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import Select from 'ui/FormInputs/Select'
import getFileTypeItems from 'ui/FormInputs/Select/Items/getFileTypeItems'

const FileSelect = ({
  accountType,
  className,
  isCompliance,
  name,
  onChange,
  value,
  withoutForm,
}) => {
  const files = getFileTypeItems({ accountType, isCompliance })

  const Component = withoutForm
    ? Select
    : Field

  return (
    <Component
      component={Select}
      name={name}
      className={className}
      value={value}
      onChange={onChange}
      items={files}
    />
  )
}

FileSelect.propTypes = {
  accountType: PropTypes.string,
  className: PropTypes.string,
  isCompliance: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  withoutForm: PropTypes.bool,
}

FileSelect.defaultProps = {
  accountType: '',
  className: '',
  name: '',
  onChange: undefined,
  value: '',
  withoutForm: false,
}

export default FileSelect
