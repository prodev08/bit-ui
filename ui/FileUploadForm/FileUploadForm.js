import React from 'react'
import PropTypes from 'prop-types'

import defaultValidations from 'utils/validations'
import onSubmitFail from 'utils/validations/onSubmitFail'
import bindTrailing from 'utils/bindTrailing'
import { OTHER_DOCUMENT } from 'var/files/documentTypes'

import Form from './FileUploadForm.Form'
import customValidations from './FileUploadForm.validators'

class FileUpload extends React.PureComponent {
  validations = bindTrailing(defaultValidations, customValidations)

  static propTypes = {
    isComplianceInitialized: PropTypes.bool.isRequired,
    isTypeEnabled: PropTypes.bool,
    defaultFile: PropTypes.string,
    _id: PropTypes.string,
    saveDocument: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isTypeEnabled: true,
    defaultFile: '',
    onSubmit: null,
    _id: null,
  }

  constructor(props) {
    super()

    const { isComplianceInitialized } = props

    this._initialValues = {
      is_private: isComplianceInitialized,
    }
  }

  onSubmit = (values) => {
    const {
      _id, saveDocument, resetForm, onSubmit,
    } = this.props

    const {
      file, default_file: type, comment, is_private,
    } = values

    const document = {
      ...file,
      type,
      is_private: !!is_private,
    }

    if (type === OTHER_DOCUMENT) {
      document.remark = comment
    }

    if (onSubmit) {
      onSubmit({
        data: document,
        onSuccess: resetForm,
      })
      return
    }

    saveDocument({
      files: [document],
      _id,
      successMessageI18n: 'toasts.data_has_been_saved',
      onSuccess: resetForm,
    })
  }

  shouldValidate = () => true

  render() {
    const {
      defaultFile,
      isComplianceInitialized,
      isTypeEnabled,
      t,
    } = this.props

    return (
      <Form
        t={t}
        initialValues={this._initialValues}
        defaultFile={defaultFile}
        isComplianceInitialized={isComplianceInitialized}
        isTypeEnabled={isTypeEnabled}
        onSubmit={this.onSubmit}
        onSubmitFail={onSubmitFail}
        validate={this.validations}
        shouldValidate={this.shouldValidate}
      />
    )
  }
}

export default FileUpload
